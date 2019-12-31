const stream = require('stream');
const fs = require('fs');
const gzip = require('zlib').createGzip(); 

const streamReadFile = fs.createReadStream('./combos_kof_2k2.mp4');
const streamWriteFile = fs.createWriteStream('./combos_kof_2k2.mp4.zip');

let zippedBytes = 0;
const register = new stream.PassThrough();

register.on('data', chunk => zippedBytes += chunk.length);

streamReadFile.pipe(gzip).pipe(register).pipe(streamWriteFile);

streamWriteFile.on('close' => console.log(`Arquivo compactado. Resultado: ${zippedBytes} bytes`));