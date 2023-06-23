import { Client } from 'ssh2';
import { Connection } from 'mysql2';
import { SSHClientConfig } from '../database-ssh-connection.js';
import { beginSSHClient } from './mysql-ssh-client.js';

import {
  connectionConfigEnv,
  forwardConfigEnv,
  tunnelConfigEnv,
} from './config.js';

const sshClient: Client = new Client();

export const beginMysqlSSH = async (
  privateKey: string,
  options: SSHClientConfig | undefined | null = undefined
): Promise<Connection> => {
  if (!privateKey) throw Error('private key is empty');
  let config: SSHClientConfig;

  if (!options) {
    tunnelConfigEnv.privateKey = privateKey;
    config = {
      connectionConfig: connectionConfigEnv,
      forwardConfig: forwardConfigEnv,
      tunnelConfig: tunnelConfigEnv,
    };
  } else {
    options.tunnelConfig.privateKey = privateKey;
    config = options;
  }

  return await beginSSHClient(sshClient, config);
};
