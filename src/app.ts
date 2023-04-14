import { Client, ClientChannel } from 'ssh2';
import mysql, { Connection, ConnectionConfig } from 'mysql';
import { dbServer, forwardConfig, tunnelConfig } from './config';
import { logEnvVariables } from './logger';
import { MysqlError } from 'mysql';

export const beginMysqlSSH = () => {
  if (process.env.NODE_ENV == 'development') {
    logEnvVariables(dbServer, forwardConfig, tunnelConfig);
  }

  const sshClient: Client = new Client();

  return new Promise((resolve, reject) => {
    sshClient
      .on('ready', () => {
        sshClient.forwardOut(
          forwardConfig.srcHost!,
          forwardConfig.srcPort,
          forwardConfig.dstHost!,
          forwardConfig.dstPort,
          (err: any, stream: ClientChannel) => {
            if (err) reject(err);

            const connectionConfig: ConnectionConfig = {
              ...dbServer,
              // stream,
            };

            const connection: Connection =
              mysql.createConnection(connectionConfig);

            connection.connect((error: MysqlError) => {
              if (error) reject(error);
              resolve(connection);
            });
          }
        );
      })
      .connect(tunnelConfig);
  }).catch((err: any) => console.error(err.message));
};

export const readPrivateKey = (path: string) => {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path, 'utf8', function (err: any, data: any) {
      if (!err) {
        tunnelConfig.privateKey = data;
        resolve(true);
      } else {
        reject(err.message);
      }
    });
  }).catch((err) => console.error(err.message));
};
