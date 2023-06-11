import Connection from 'mysql2/typings/mysql/lib/Connection';

declare module 'database-ssh-connection' {
  export function beginMysqlSSH(privateKey: string): Promise<Connection>;
}
