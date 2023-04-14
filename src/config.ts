import * as dotenv from 'dotenv';
dotenv.config();

export const dbServer = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const tunnelConfig = {
  host: process.env.DB_SSH_HOST,
  port: parseInt(process.env.DB_SSH_HOST_PORT!),
  username: process.env.DB_SSH_USER,
  privateKey: process.env.PRIVATE_KEY_PATH,
};

export const forwardConfig = {
  srcHost: process.env.SRC_HOST, // any valid address
  srcPort: parseInt(process.env.SRC_PORT!), // any valid port
  dstHost: process.env.DB_HOST, // destination database
  dstPort: parseInt(process.env.DB_PORT!), // destination port
};
