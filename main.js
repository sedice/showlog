const shelljs = require('shelljs');

const ret = shelljs.exec(`git log --after="2018-08-21 00:00:00"  --date=format:'%Y-%m-%d' `);

console.log(ret)