const { promisify } = require('util');
const fs = require('fs');
const { spawn } = require('child_process');

// Função para compilar o código C em uma biblioteca WebAssembly
async function compileCCode(inputFile, outputFile, exportedFunctions) {
    // Use promisify para tornar fs.writeFile e fs.readFile assíncronos
    const writeFile = promisify(fs.writeFile);
    const readFile = promisify(fs.readFile);

    // Comando para executar a compilação usando emcc
    const emccCommand = 'emcc';
    const args = [
        '-o', outputFile,
        '-s', `EXPORTED_FUNCTIONS=${exportedFunctions}`,
        inputFile
    ];

    // Execute o comando em um processo secundário
    const compilationProcess = spawn(emccCommand, args);

    // Capture a saída padrão e padrão de erro, se necessário
    compilationProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    compilationProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // Aguarde a conclusão da compilação
    await new Promise((resolve, reject) => {
        compilationProcess.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(`Erro na compilação do arquivo C. Código de saída: ${code}`);
            }
        });
    });
}

// Exemplo de uso da função de compilação
const inputFile = '../lib/arithmetic.c';  // Arquivo C de entrada
const outputFile = '../arithmetic_lib.js';  // Arquivo de saída WebAssembly
const exportedFunctions = "['_add', '_subtract', '_divide', '_ceil_round', '_ceil_round', '_round_to_nearest']";  // Funções exportadas

compileCCode(inputFile, outputFile, exportedFunctions)
    .then(() => {
        console.log('Compilação concluída com sucesso!');
    })
    .catch((error) => {
        console.error('Erro na compilação:', error);
    });
