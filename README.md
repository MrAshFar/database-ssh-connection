**HOW TO USE**

Example 1:

```js
const { beginMysqlSSH, readPrivateKey } = require('../src/app');

(async () => {
  await readPrivateKey('./pk/key');

  let connection = await beginMysqlSSH();

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
```

Example 2:

```js
const { beginMysqlSSH, readPrivateKey } = require('../src/app');

(() => {
  readPrivateKey('./pk/key').then(
    () => {
      beginMysqlSSH().then(
        (connection) => {
          console.log('ssh connection ok');

          connection.query(
            `SELECT 1 AS result FROM user WHERE uid ='Ashkan';`,
            (error, results, fields) => {
              console.log(JSON.stringify(error));
              console.log(JSON.stringify(results));
              console.log(JSON.stringify(fields));
            }
          );
        },
        (rej) => console.log('rej', rej)
      );
    },
    () => console.log('unable to read the private key file')
  );
})();
```

**.env**

Environment variables are required, Create a `.env` file in the project root directory and add the below variables:

```
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=YOUR-PASSWORD
DB_DATABASE=YOUR-DATABASE
DB_SSH_HOST=YOUR-SSH-HOST
DB_SSH_HOST_PORT=YOUR-SSH-PORT
DB_SSH_USER=YOUR-SSH-USERNAME
SRC_HOST=localhost
SRC_PORT=9001
```
