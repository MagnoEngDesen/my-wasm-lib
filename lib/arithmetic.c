#include <emscripten.h>
#include <math.h>

double performFixedPointOperation(double a, double b, int operation, int decimalPlaces) {
    if (decimalPlaces == 0) {
        decimalPlaces = 6; // Valor padrão de 6 casas decimais
    }

    int multiplier = 1;
    for (int i = 0; i < decimalPlaces; i++) {
        multiplier *= 10;
    }

    int intA = (int)(a * multiplier);
    int intB = (int)(b * multiplier);

    int result;
    switch (operation) {
        case 0:  // Adição
            result = intA + intB;
            break;
        case 1:  // Subtração
            result = intA - intB;
            break;
        case 2:  // Divisão
            if (intB == 0) {
                return nan("");  // Divisão por zero
            }
            result = intA / intB;
            break;
        case 3:  // Arredondamento para cima
            result = (intA % multiplier == 0) ? intA / multiplier : intA / multiplier + 1;
            break;
        case 4:  // Arredondamento para o mais próximo
            result = (intA + intB / 2) / multiplier;
            break;
        // Adicione casos para outras operações aqui, se necessário
        default:
            return nan("");  // Operação desconhecida
    }

    return (double)result / multiplier;
}

EMSCRIPTEN_KEEPALIVE
double add(double a, double b, int decimalPlaces) {
    return performFixedPointOperation(a, b, 0, decimalPlaces);  // 0 representa adição
}

EMSCRIPTEN_KEEPALIVE
double subtract(double a, double b, int decimalPlaces) {
    return performFixedPointOperation(a, b, 1, decimalPlaces);  // 1 representa subtração
}

EMSCRIPTEN_KEEPALIVE
double divide(double a, double b, int decimalPlaces) {
    return performFixedPointOperation(a, b, 2, decimalPlaces);  // 2 representa divisão
}

EMSCRIPTEN_KEEPALIVE
double ceil_round(double num, int decimalPlaces) {
    return performFixedPointOperation(num, 0, 3, decimalPlaces);  // 3 representa arredondamento para cima
}

EMSCRIPTEN_KEEPALIVE
double round_to_nearest(double num, int decimalPlaces) {
    return performFixedPointOperation(num, 0, 4, decimalPlaces);  // 4 representa arredondamento para o mais próximo
}
