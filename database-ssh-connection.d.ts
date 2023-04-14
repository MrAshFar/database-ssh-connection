declare module 'database-ssh-connection' {
  export function beginMysqlSSH(): Promise<any>;
  export function readPrivateKey(path: string): Promise<any>;
}
