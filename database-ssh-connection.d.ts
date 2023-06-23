import Connection from 'mysql2/typings/mysql/lib/Connection';

export function beginMysqlSSH(
  privateKey: string,
  config?: SSHClientConfig
): Promise<Connection>;

export declare type SSHClientConfig = {
  connectionConfig: ConnectionOptions;
  forwardConfig: forwardConfig;
  tunnelConfig: ConnectConfig;
};
export type forwardConfig = {
  srcHost?: string; // any valid address
  srcPort: number;
  dstHost?: string;
  dstPort: number;
};
