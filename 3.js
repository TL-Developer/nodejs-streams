const fs = require('fs');

// padrao é 65k
const strmReadFile = fs.createReadStream('./combos_kof_2k2.mp4', { highWaterMark: 10*1024*1024 });
const strmWriteFile = fs.createWriteStream('./combos_kof_2k2_2.mp4');

let totalReads = 0;
let totalBytes = 0;

strmReadFile.on('data', chunk => {
  totalReads++;
  totalBytes += chunk.length;
  console.log(`${chunk.length} bytes lidos.`);

  const result = strmWriteFile.write(chunk);
  if (!result) {
    console.log('backpressure!');
  }
});

strmReadFile.on('end', chunk => strmWriteFile.end());

strmWriteFile.on('close', () => console.log(`arquivo copiado: ${totalReads} leituras/${totalBytes} bytes`))