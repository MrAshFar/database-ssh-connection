import Connection from 'mysql2/typings/mysql/lib/Connection';

export function beginMysqlSSH(privateKey: string): Promise<Connection>;
export declare type SSHClientOptions = {
  connectionConfig: any;
  forwardConfig: any;
  tunnelConfig: any;
};
