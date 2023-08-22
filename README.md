**HOW TO USE**

```js
const sshClient = new Client();

const key = readFileSync('./pk/key', { encoding: 'utf8' });

const config: SSHClientConfig = {
  connectionConfig: {
    host: '127.0.0.1',
    port: 3306,
    user: 'database username',
    password: 'database password',
    database: 'database name',
  },
  forwardConfig: {
    srcHost: '127.0.0.1', // any valid address
    srcPort: 9000, // any open port
    dstHost: '127.0.0.1', // destination database
    dstPort: 3306, // destination port
  },

  tunnelConfig: {
    host: 'YOUR.HOST.IP.ADDRESS',
    port: 22,
    username: 'root',
    privateKey: key,
  },
};

const connection = await beginMysqlSSH(sshClient, config);

console.log('ssh connection ok');

connection.query(
  `SELECT 1 AS result FROM user WHERE uid ='Ashkan';`,
  (error: any, results: any, fields: any) => {
    console.log(JSON.stringify(error));
    console.log(JSON.stringify(results));
    console.log(JSON.stringify(fields));
    process.exit(0);
  }
);
```
