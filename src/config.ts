require("dotenv").config();

module.exports.dbServer = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

module.exports.tunnelConfig = {
  host: process.env.DB_SSH_HOST,
  port: process.env.DB_SSH_HOST_PORT,
  username: process.env.DB_SSH_USER,
  privateKey: process.env.PRIVATE_KEY_PATH,
};

module.exports.forwardConfig = {
  srcHost: process.env.SRC_HOST, // any valid address
  srcPort: process.env.SRC_PORT, // any valid port
  dstHost: process.env.DB_HOST, // destination database
  dstPort: process.env.DB_PORT, // destination port
};
