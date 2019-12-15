const fs = require('fs');
const gzip = require('zlib').createGzip(); //duplex

// padrao é 65k
const strmReadFile = fs.createReadStream('./combos_kof_2k2.mp4', { highWaterMark: 1*1024*1024 });
const strmWriteFile = fs.createWriteStream('./combos_kof_2k2_2.mp4.zip');

let totalReads = 0;
let totalWrites = 0;

// backpressure

// flowing mode
// strmReadFile.on('data', chunk => {
//   console.log(`${totalReads++} - ${chunk.length} bytes lidos.`);
//   gzip.write(chunk);
// });

// gzip.on('data', chunk => {
//   console.log(`${totalWrites} - ${chunk.length} bytes gravados.`);
//   strmWriteFile.write(chunk);
// });

// strmReadFile.on('end', chunk => gzip.end());
// gzip.on('close', () => strmWriteFile.end());
// strmWriteFile.on('close', () => console.log(`arquivo compactado`));


// pause mode
strmReadFile.on('data', chunk => {
  console.log(`${totalReads++} - ${chunk.length} bytes lidos.`);
  const result = gzip.write(chunk);
  if (!result) {
    strmReadFile.pause();
  }
});

gzip.on('drain', () => strmReadFile.resume());

gzip.on('data', chunk => {
  console.log(`${totalWrites++} - ${chunk.length} bytes gravados.`);
  const result = strmWriteFile.write(chunk);
  if (!result) {
    gzip.pause();
  }
});

strmWriteFile.on('drain', () => gzip.resume()); 


strmReadFile.on('end', chunk => gzip.end());
gzip.on('close', () => strmWriteFile.end());
strmWriteFile.on('close', () => console.log(`arquivo compactado`));