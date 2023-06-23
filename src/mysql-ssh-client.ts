import { Client, ClientChannel } from 'ssh2';
import mysql, { Connection, QueryError } from 'mysql2';
import { SSHClientConfig } from '../database-ssh-connection';
import { logEnvVariables } from './log';

const isDev = process.env.NODE_ENV != 'production';

export const beginSSHClient = async (
  sshClient: Client,
  options: SSHClientConfig
): Promise<Connection> => {
  const connection: Connection = await new Promise((resolve, reject) => {
    if (isDev)
      logEnvVariables(
        options.connectionConfig,
        options.forwardConfig,
        options.tunnelConfig
      );

    sshClient.on('ready', () => {
      sshClientOnReadyListener(sshClient, options).then(
        (res: Connection) => resolve(res),
        (rej) => reject(rej)
      );
    });

    if (isDev) {
      sshClient.on('connect', () => console.log('ssh client connected'));
      sshClient.on('end', () => console.log('ssh client connection end'));
      sshClient.on('close', () => console.log('ssh client connection closed'));
    }

    sshClient.connect(options.tunnelConfig);
  });
  return connection;
};

const sshClientOnReadyListener = async (
  sshClient: Client,
  options: any
): Promise<Connection> => {
  const connection: Connection = await new Promise((resolve, reject) => {
    sshClient.forwardOut(
      options.forwardConfig.srcHost!,
      options.forwardConfig.srcPort,
      options.forwardConfig.dstHost!,
      options.forwardConfig.dstPort,
      (err: any, stream: ClientChannel) => {
        if (err) reject(err);
        const config = { ...options.connectionConfig, stream };
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
