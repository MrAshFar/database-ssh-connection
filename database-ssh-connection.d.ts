declare module "database-ssh-connection" {
  export function BeginMysqlSSH(): Promise;
  export function ReadPrivateKey(path: string): Promise;
}
