import { Client, ClientChannel } from 'ssh2';
import { Connection, createConnection, QueryError } from 'mysql2';
import { SSHClientConfig } from '../index.js';

/** begin ssh connection to mysql database
 * @param {Client} sshClient pass ssh2 client
 * @param {SSHClientConfig} config ssh client config
 */
export async function beginMysqlSSH(
  sshClient: Client,
  config: SSHClientConfig
): Promise<Connection> {
  const connection: Connection = await new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
      sshClientOnReadyListener(sshClient, config).then(
        (res: Connection) => resolve(res),
        (rej) => reject(rej)
      );
    });

    sshClient.connect(config.tunnelConfig);
  });
  return connection;
}

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

        const connection: Connection = createConnection({
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
