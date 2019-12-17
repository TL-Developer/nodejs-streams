const fs = require('fs');
const gzip = require('zlib').createGzip(); //duplex

// padrao é 65k
const strmReadFile = fs.createReadStream('./combos_kof_2k2.mp4', { highWaterMark: 1*1024*1024 });
const strmWriteFile = fs.createWriteStream('./combos_kof_2k2_2.mp4.zip');

strmReadFile.pipe(gzip).pipe(strmWriteFile);

strmWriteFile.on('close', () => console.log(`Arquivo compactado`));