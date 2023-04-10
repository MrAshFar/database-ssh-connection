declare module "database-ssh-connection" {
  export function BeginMyslqSSH(): Promise;
  export function ReadPrivateKey(path: string): Promise;
}
