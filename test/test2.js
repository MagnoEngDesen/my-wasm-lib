const p = new Table({
    columns: [
      { name: 'Cenário', alignment: 'left', color: 'blue' },
      { name: 'Entrada A', alignment: 'right' },
      { name: 'Entrada B', alignment: 'right' },
      { name: 'Sem Biblioteca', alignment: 'right' },
      { name: 'Com Biblioteca', alignment: 'right' },
      { name: 'Esperado Sem Biblioteca', title: 'Esperado Sem Biblioteca', alignment: 'right' },
          ],
    colorMap: {
      custom_green: '\x1b[32m',
    },
  });
  
  // Defina os cenários de teste e casos de teste
  const testCases = [
    { scenario: 1, a: 0.1, b: 0.2, expectedWithoutLibrary: 0.3 },
    { scenario: 2, a: 1.234, b: 2.345, expectedWithoutLibrary: 3.579 },
    { scenario: 3, a: 5.678, b: 9.012, expectedWithoutLibrary: 14.69 },
    { scenario: 4, a: 100.5, b: 75.25, expectedWithoutLibrary: 175.75 },
    { scenario: 5, a: 7.123456, b: 3.789123, expectedWithoutLibrary: 10.912579 },
    { scenario: 6, a: 0.0001, b: 0.00001, expectedWithoutLibrary: 0.00011 },
    { scenario: 7, a: 12345.67, b: 9876.54, expectedWithoutLibrary: 22222.21 },
    // Adicione mais casos de teste realistas aqui
  ];
  
  testCases.forEach((testCase) => {
    const { scenario, a, b, expectedWithoutLibrary } = testCase;
    const resultWithoutLibrary = a + b; // Realize o cálculo sem a biblioteca
    const resultWithLibrary = arithmetic.add(a, b); // Realize o cálculo com a biblioteca
  
    p.addRow(
      {
        Cenário: scenario,
        'Entrada A': a,
        'Entrada B': b,
        'Sem Biblioteca': resultWithoutLibrary,
        'Com Biblioteca': resultWithLibrary,
        'Esperado Sem Biblioteca': expectedWithoutLibrary,
      },
      { color: 'green' }
    );
  });
  
  p.printTable();