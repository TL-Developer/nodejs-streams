
// Alterando a leitura para string
process.stdin.setEncoding('utf-8');

// Readable Stream, processa a cada LFRC 
process.stdin.on('data', line => console.log(line));



