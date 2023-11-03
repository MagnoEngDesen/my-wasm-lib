/**
 * Classe ArithmeticLibrary
 *
 * Uma classe que encapsula uma biblioteca WebAssembly gerada a partir de código C.
 * Fornece métodos para realizar operações matemáticas com precisão personalizada.
 */
class ArithmeticLibrary {
    /**
     * Construtor da classe.
     * Carrega o módulo WebAssembly e aguarda a inicialização.
     */
    constructor() {
      // Carrega o módulo WebAssembly a partir do arquivo gerado
      this.arithmeticModule = require('../arithmetic_lib');
      // Inicialização assíncrona, resolvida quando o ambiente WebAssembly está pronto
      this.initializationPromise = this.initializeModule();
    }
  
    /**
     * Inicializa o módulo WebAssembly e aguarda a sua prontidão.
     * @returns {Promise} Uma promessa que é resolvida quando o ambiente WebAssembly está pronto.
     */
    async initializeModule() {
      await new Promise((resolve) => {
        this.arithmeticModule.onRuntimeInitialized = resolve;
      });
    }
  
    /**
     * Realiza a adição de dois números com precisão personalizada.
     * @param {number} a - O primeiro número a ser somado.
     * @param {number} b - O segundo número a ser somado.
     * @param {number} decimalPlaces - O número de casas decimais desejado na precisão (padrão é 6).
     * @returns {number} O resultado da adição com a precisão especificada.
     */
    add(a, b, decimalPlaces = 6) {
        console.log(a,b)
      return this.arithmeticModule._add(a, b, decimalPlaces);
    }
  
    /**
     * Realiza a subtração de dois números com precisão personalizada.
     * @param {number} a - O número do qual será subtraído.
     * @param {number} b - O número a ser subtraído.
     * @param {number} decimalPlaces - O número de casas decimais desejado na precisão (padrão é 6).
     * @returns {number} O resultado da subtração com a precisão especificada.
     */
    subtract(a, b, decimalPlaces = 6) {
      return this.arithmeticModule._subtract(a, b, decimalPlaces);
    }
  
    /**
     * Realiza a divisão de dois números com precisão personalizada.
     * @param {number} a - O número que será dividido.
     * @param {number} b - O número pelo qual será dividido.
     * @param {number} decimalPlaces - O número de casas decimais desejado na precisão (padrão é 6).
     * @returns {number} O resultado da divisão com a precisão especificada.
     */
    divide(a, b, decimalPlaces = 6) {
      return this.arithmeticModule._divide(a, b, decimalPlaces);
    }
  
    /**
     * Realiza o arredondamento para cima de um número com precisão personalizada.
     * @param {number} num - O número a ser arredondado para cima.
     * @param {number} decimalPlaces - O número de casas decimais desejado na precisão (padrão é 6).
     * @returns {number} O resultado do arredondamento para cima com a precisão especificada.
     */
    ceilRound(num, decimalPlaces = 6) {
      return this.arithmeticModule._ceil_round(num, decimalPlaces);
    }
  
    /**
     * Realiza o arredondamento para o valor mais próximo de um número com precisão personalizada.
     * @param {number} num - O número a ser arredondado para o valor mais próximo.
     * @param {number} decimalPlaces - O número de casas decimais desejado na precisão (padrão é 6).
     * @returns {number} O resultado do arredondamento para o valor mais próximo com a precisão especificada.
     */
    roundToNearest(num, decimalPlaces = 6) {
      return this.arithmeticModule._round_to_nearest(num, decimalPlaces);
    }
  }
  
  module.exports = ArithmeticLibrary;
  