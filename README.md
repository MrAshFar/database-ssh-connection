**HOW TO USE**

Example:

```js
import { beginMysqlSSH } from '../dist/app.js';
import { readFileSync } from 'node:fs';

(async () => {
  const key = readFileSync('./pk/key', { encoding: 'utf8' });
  const connection = await beginMysqlSSH(key);
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

**.env**

Environment variables are required, Create a `.env` file in the project root directory and add the below variables:

```
NODE_ENV = 'development'
# connectionConfig
DB_HOST = '127.0.0.1'
DB_PORT = 3306
DB_USERNAME = 'database username'
DB_PASSWORD = 'database password'
DATABASE = 'database name'
# ssh configuration
SSH_HOST = 'YOUR.HOST.IP.ADDRESS'
SSH_PORT = 22
SSH_USERNAME = 'root'
# local machine configuration, SRC_PORT = any open port
SRC_HOST = '127.0.0.1'
SRC_PORT = 9001
```
