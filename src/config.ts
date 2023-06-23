import dotenv from 'dotenv';
dotenv.config();

import { ConnectionOptions } from 'mysql2';
import { ConnectConfig } from 'ssh2';
import { env } from 'process';

export const connectionConfigEnv: ConnectionOptions = {
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT!),
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DATABASE,
};

export const forwardConfigEnv = {
  srcHost: env.SRC_HOST, // any valid address
  srcPort: parseInt(env.SRC_PORT!), // any open port
  dstHost: env.DB_HOST, // destination database
  dstPort: parseInt(env.DB_PORT!), // destination port
};

export const tunnelConfigEnv: ConnectConfig = {
  host: env.SSH_HOST,
  port: parseInt(env.SSH_PORT!),
  username: env.SSH_USERNAME,
  privateKey: '',
};
