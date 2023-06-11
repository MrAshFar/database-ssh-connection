import { beginMysqlSSH } from '../dist/app.js';
import { readFileSync } from 'node:fs';

(async () => {
  try {
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
  } catch (err) {
    console.error(err);
  }
})();
