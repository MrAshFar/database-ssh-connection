import Connection from 'mysql2/typings/mysql/lib/Connection';

export function beginMysqlSSH(
  privateKey: string,
  config?: SSHClientConfig
): Promise<Connection>;

export type SSHClientConfig = {
  connectionConfig: ConnectionOptions;
  forwardConfig: forwardConfig;
  tunnelConfig: tunnelConfig;
};

export type forwardConfig = {
  srcHost: string;
  srcPort: number;
  dstHost: string;
  dstPort: number;
};

export type ConnectionOptions = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export type tunnelConfig = {
  host: string;
  port: number;
  username: string;
  privateKey?: string;
};
