import { Client } from 'ssh2';
import { Connection } from 'mysql2';

import {
  connectionConfigEnv,
  forwardConfigEnv,
  tunnelConfigEnv,
} from './config.js';

import { SSHClientOptions } from '../database-ssh-connection.js';
import { beginSSHClient } from './mysql-ssh-client.js';

const sshClient: Client = new Client();

export const beginMysqlSSH = async (
  privateKey: string
): Promise<Connection> => {
  if (!privateKey) throw Error('private key is empty');

  tunnelConfigEnv.privateKey = privateKey;

  const options: SSHClientOptions = {
    connectionConfig: connectionConfigEnv,
    forwardConfig: forwardConfigEnv,
    tunnelConfig: tunnelConfigEnv,
  };

  return await beginSSHClient(sshClient, options);
};
