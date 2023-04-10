HOW TO USE

**HOW TO USE**

```
const { BeginMyslqSSH, ReadPrivateKey } = require("../src/app");

ReadPrivateKey("./pk/key").then(
  () => {
    BeginMyslqSSH().then(
      (res) => console.log("res", res), // mysql connection object
      (rej) => console.log("rej", rej)
    );
  },
  () => console.log("unable to read the private key file")
);
```
