import { Client, ClientChannel } from 'ssh2';
import mysql, { Connection, QueryError } from 'mysql2';
import { SSHClientConfig } from '../database-ssh-connection';
import { logEnvVariables } from './log.js';

const isDev = process.env.NODE_ENV != 'production';

export const beginSSHClient = async (
  sshClient: Client,
  config: SSHClientConfig
): Promise<Connection> => {
  const connection: Connection = await new Promise((resolve, reject) => {
    if (isDev)
      logEnvVariables(
        config.connectionConfig,
        config.forwardConfig,
        config.tunnelConfig
      );

    sshClient.on('ready', () => {
      sshClientOnReadyListener(sshClient, config).then(
        (res: Connection) => resolve(res),
        (rej) => reject(rej)
      );
    });

    if (isDev) {
      sshClient.on('connect', () => console.log('ssh client connected'));
      sshClient.on('end', () => console.log('ssh client connection end'));
      sshClient.on('close', () => console.log('ssh client connection closed'));
    }

    sshClient.connect(config.tunnelConfig);
  });
  return connection;
};

const sshClientOnReadyListener = async (
  sshClient: Client,
  config: any
): Promise<Connection> => {
  const connection: Connection = await new Promise((resolve, reject) => {
    sshClient.forwardOut(
      config.forwardConfig.srcHost!,
      config.forwardConfig.srcPort,
      config.forwardConfig.dstHost!,
      config.forwardConfig.dstPort,
      (err: any, stream: ClientChannel) => {
        if (err) reject(err);

        const connection: Connection = mysql.createConnection({
          ...config.connectionConfig,
          stream,
        });

        connection.connect((error: QueryError | null) => {
          if (error) reject(error);
          resolve(connection);
        });
      }
    );
  });
  return connection;
};
