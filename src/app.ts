const { dbServer, forwardConfig, tunnelConfig } = require("./config");
const mysql = require("mysql2");
const { Client } = require("ssh2");
const { log_env_variables } = require("./logger");

module.exports.BeginMysqlSSH = () => {
  if (process.env.NODE_ENV == "development") {
    log_env_variables(dbServer, forwardConfig, tunnelConfig);
  }
  // create an instance of SSH Client
  const sshClient = new Client();
  return new Promise((resolve, reject) => {
    sshClient
      .on("ready", () => {
        sshClient.forwardOut(
          forwardConfig.srcHost,
          forwardConfig.srcPort,
          forwardConfig.dstHost,
          forwardConfig.dstPort,
          (err: any, stream: any) => {
            if (err) reject(err);

            const updatedDbServer = {
              ...dbServer,
              stream,
            };

            const connection = mysql.createConnection(updatedDbServer);

            connection.connect((error: any) => {
              if (error) reject(error);
              resolve(connection);
            });
          }
        );
      })
      .connect(tunnelConfig);
  }).catch((err) => console.error(err.message));
};

module.exports.ReadPrivateKey = (path: string) => {
  return new Promise((resolve, reject) => {
    require("fs").readFile(path, "utf8", function (err: any, data: any) {
      if (!err) {
        tunnelConfig.privateKey = data;
        resolve(true);
      } else {
        console.error(err.message);
        reject(false);
      }
    });
  }).catch((err) => console.error(err.message));
};
