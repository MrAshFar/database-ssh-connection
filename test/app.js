const { beginMysqlSSH } = require('../dist/app');

(async () => {
  await readPrivateKey('./pk/key');
  const connection = await beginMysqlSSH();
  console.log('ssh connection ok');
  connection.query(
    `SELECT 1 AS result FROM user WHERE uid ='Ashkan';`,
    (error, results, fields) => {
      console.log(JSON.stringify(error));
      console.log(JSON.stringify(results));
      console.log(JSON.stringify(fields));
    }
  );
})();

// (() => {
//   ReadPrivateKey("./pk/key").then(
//     () => {
//       BeginMysqlSSH().then(
//         (connection) => {
//           console.log("ssh connection ok");
//           connection.query(`SELECT 1 AS result FROM user WHERE uid ='Ashkan';`, (error, results, fields) => {
//             console.log(JSON.stringify(error));
//             console.log(JSON.stringify(results));
//             console.log(JSON.stringify(fields));
//           });
//         },
//         (rej) => console.log("rej", rej)
//       );
//     },
//     () => console.log("unable to read private key file")
//   );
// })();
