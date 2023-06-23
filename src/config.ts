import { ConnectionOptions } from 'mysql2';
import { ConnectConfig } from 'ssh2';

export const connectionConfigEnv: ConnectionOptions = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
};

export const tunnelConfigEnv: ConnectConfig = {
  host: process.env.SSH_HOST,
  port: parseInt(process.env.SSH_PORT!),
  username: process.env.SSH_USERNAME,
  privateKey: '',
};

export const forwardConfigEnv = {
  srcHost: process.env.SRC_HOST, // any valid address
  srcPort: parseInt(process.env.SRC_PORT!), // any open port
  dstHost: process.env.DB_HOST, // destination database
  dstPort: parseInt(process.env.DB_PORT!), // destination port
};
