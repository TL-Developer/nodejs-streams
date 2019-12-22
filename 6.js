const fs = require('fs');
// $ node 4 | node 6
process.stdin.pipe(fs.createWriteStream('file.txt'));