# my-wasm-lib
Projeto de integração de uma biblioteca em C para usar em JavaScript por meio da tecnologia WebAssembly
# Biblioteca de Precisão Matemática com WebAssembly

## Sobre o Projeto

Este projeto tem como objetivo melhorar a precisão em operações matemáticas de alta precisão no contexto do JavaScript. A biblioteca é desenvolvida em C e compilada para WebAssembly, permitindo aprimorar a qualidade das operações matemáticas em cenários críticos, como aplicações financeiras.

## Tecnologias Utilizadas

- C
- WebAssembly
- JavaScript

## Como Usar

A biblioteca oferece funções de aritmética, como adição, divisão e multiplicação, para melhorar a precisão dos cálculos matemáticos no JavaScript. Veja um exemplo de uso:

```javascript
// Exemplo de uso da biblioteca em JavaScript
const arithmetic = new ArithmeticLibrary();
arithmetic.initializationPromise.then(()=> {
const result = arithmetic.add(5.1, 2.3);
console.log(result); // Saída: 7.4
})
