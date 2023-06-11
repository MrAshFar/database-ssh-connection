import { Client, ClientChannel } from 'ssh2';
import mysql, { Connection, QueryError } from 'mysql2';
import { connectionConfig, forwardConfig, tunnelConfig } from './config.js';
import { logEnvVariables } from './logger.js';

const sshClient: Client = new Client();

export const beginMysqlSSH = async (
  privateKey: string
): Promise<Connection> => {
  if (!privateKey) throw Error('private key is empty');

  tunnelConfig.privateKey = privateKey;

  if (process.env.NODE_ENV == 'development')
    logEnvVariables(connectionConfig, forwardConfig, tunnelConfig);

  const connection: Connection = await new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
      sshClientOnReadyListener(sshClient).then(
        (res: Connection) => resolve(res),
        (rej) => reject(rej)
      );
    });

    sshClient.on('connect', () => console.log('ssh client connected'));
    sshClient.on('end', () => console.log('ssh client connection end'));
    sshClient.on('close', () => console.log('ssh client connection closed'));

    sshClient.connect(tunnelConfig);
  });
  return connection;
};

const sshClientOnReadyListener = async (
  sshClient: Client
): Promise<Connection> => {
  const connection: Connection = await new Promise((resolve, reject) => {
    sshClient.forwardOut(
      forwardConfig.srcHost!,
      forwardConfig.srcPort,
      forwardConfig.dstHost!,
      forwardConfig.dstPort,
      (err: any, stream: ClientChannel) => {
        if (err) reject(err);
        const config = { ...connectionConfig, stream };
        const connection: Connection = mysql.createConnection(config);

        connection.connect((error: QueryError | null) => {
          if (error) reject(error);
          resolve(connection);
        });
      }
    );
  });
  return connection;
};
