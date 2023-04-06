const { dbServer, forwardConfig, tunnelConfig } = require("./config.js");
const mysql = require("mysql2");
const { Client } = require("ssh2");

if (process.env.NODE_ENV == "development") {
  console.log("#------ dbServer -----------------------#");
  console.log(`dbServer: ${JSON.stringify(dbServer)}`);
  console.log("#------ forwardConfig ------------------#");
  console.log(`forwardConfig: ${JSON.stringify(forwardConfig)}`);
  console.log("#------ tunnelConfig -------------------#");
  Object.keys(tunnelConfig).forEach((key) => console.log(`${key}:${tunnelConfig[key]}`));
}
// create an instance of SSH Client
const sshClient = new Client();

const SSHConnection = new Promise((resolve, reject) => {
  sshClient
    .on("ready", () => {
      sshClient.forwardOut(forwardConfig.srcHost, forwardConfig.srcPort, forwardConfig.dstHost, forwardConfig.dstPort, (err, stream) => {
        if (err) reject(err);

        const updatedDbServer = {
          ...dbServer,
          stream,
        };

        const connection = mysql.createConnection(updatedDbServer);

        connection.connect((error) => {
          if (error) reject(error);
          resolve(connection);
        });
      });
    })
    .connect(tunnelConfig)
    .catch((err) => console.error(err.message));
}).catch((err) => console.error(err.message));

module.exports.BeginMyslqSSH = () => {
  return SSHConnection;
};
