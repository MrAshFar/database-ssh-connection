const { BeginMyslqSSH, ReadPrivateKey } = require("../src/app");

ReadPrivateKey("./pk/key").then(
  () => {
    BeginMyslqSSH().then(
      (res) => console.log("res", res),
      (rej) => console.log("rej", rej)
    );
  },
  () => console.log("unable to read private key file")
);
