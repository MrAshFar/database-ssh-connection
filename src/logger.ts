module.exports.log_env_variables = (dbServer: any, forwardConfig: any, tunnelConfig: any) => {
  console.log("#------ dbServer -----------------------#");
  console.log(`dbServer: ${JSON.stringify(dbServer)}`);
  console.log("#------ forwardConfig ------------------#");
  console.log(`forwardConfig: ${JSON.stringify(forwardConfig)}`);
  console.log("#------ tunnelConfig -------------------#");
  Object.keys(tunnelConfig).forEach((key) => console.log(`${key}:${tunnelConfig[key]}`));
};
