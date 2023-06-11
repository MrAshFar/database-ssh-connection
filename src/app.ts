import { Client, ClientChannel } from 'ssh2';
import mysql, { Connection, QueryError } from 'mysql2';
import { connectionConfig, forwardConfig, tunnelConfig } from './config';
import { logEnvVariables } from './logger';

const sshClient: Client = new Client();

export const beginMysqlSSH = async (
  privateKey: string
): Promise<Connection> => {
  if (process.env.NODE_ENV == 'development')
    logEnvVariables(connectionConfig, forwardConfig, tunnelConfig);

  if (!privateKey) throw Error('private key is empty');

  return new Promise((resolve, reject) => {
    try {
      sshClient.addListener('ready', () => {
        resolve(sshClientOnReadyListener(sshClient));
      });
      sshClient.connect(tunnelConfig);
    } catch (err) {
      reject(err);
    }
  });
};

const sshClientOnReadyListener = async (
  sshClient: Client
): Promise<Connection> => {
  return new Promise((resolve, reject) => {
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
};
