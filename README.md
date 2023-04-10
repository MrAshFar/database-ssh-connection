**HOW TO USE**

```
const { BeginMysqlSSH, ReadPrivateKey } = require("../src/app");

ReadPrivateKey("./pk/key").then(
  () => {
    BeginMysqlSSH().then(
      (res) => console.log("res", res), // mysql connection object
      (rej) => console.log("rej", rej)
    );
  },
  () => console.log("unable to read the private key file")
);
```
