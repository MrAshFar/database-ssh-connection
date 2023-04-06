const { BeginMyslqSSH } = require("../src/app");

(() => {
  BeginMyslqSSH().then(
    (res) => console.log("res", res),
    (rej) => console.log("rej", rej)
  );
})();
