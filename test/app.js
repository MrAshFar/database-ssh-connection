const { BeginMysqlSSH, ReadPrivateKey } = require("../src/app");

ReadPrivateKey("./pk/key").then(
  () => {
    BeginMysqlSSH().then(
      (res) => console.log("res", res),
      (rej) => console.log("rej", rej)
    );
  },
  () => console.log("unable to read private key file")
);
