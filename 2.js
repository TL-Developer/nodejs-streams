const fs = require('fs');

// padrao é 65k
const strmReadFile = fs.createReadStream('./combos_kof_2k2.mp4'); //{ highWaterMark: 10*1024*1024 });

let totalReads = 0;
let totalBytes = 0;

// flowing mode
// strmReadFile.on('data', chunk => {
//   totalReads++;
//   totalBytes += chunk.length;
//   console.log(`${chunk.length} bytes lidos.`);
// });

// strmReadFile.on('end', chunk => console.log(`Fim - ${totalReads} leituras/${totalBytes} bytes.`));

// process.stdin.on('data', () => {});

// pause mode
strmReadFile.pause();
strmReadFile.on('data', chunk => {
  totalReads++;
  totalBytes += chunk.length;
  console.log(`${chunk.length} bytes lidos.`);
});

strmReadFile.on('end', chunk => console.log(`Fim - ${totalReads} leituras/${totalBytes} bytes.`));

process.stdin.on('data', line => {
  if (line.toString() === '\n') { // quando der um enter no terminal ele roda de 65k em 65k
    strmReadFile.read();
  }
});