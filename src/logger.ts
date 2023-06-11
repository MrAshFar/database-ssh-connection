export const logEnvVariables = (
  connectionConfig: any,
  forwardConfig: any,
  tunnelConfig: any
) => {
  console.log('#------ connection configuration -----------------------#');
  console.log(`dbServer: ${JSON.stringify(connectionConfig)}`);
  console.log('#------ forwardConfig ------------------#');
  console.log(`forwardConfig: ${JSON.stringify(forwardConfig)}`);
  console.log('#------ tunnelConfig -------------------#');
  Object.keys(tunnelConfig).forEach((key) =>
    console.log(`${key}:${tunnelConfig[key]}`)
  );
};
