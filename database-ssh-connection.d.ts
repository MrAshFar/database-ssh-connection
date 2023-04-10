declare module "database-ssh-connection" {
  export function BeginMysqlSSH(): Promise<any>;
  export function ReadPrivateKey(path: string): Promise<any>;
}
