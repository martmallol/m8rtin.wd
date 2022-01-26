var assert = require("assert");
var Calculate =  require('../index.js')

describe('Calculate', () => {
  describe('.factorial', () => {
    // Agrego un 'it' que cubre el caso donde 5! tiene que dar 120
    it('should give 120 if the output is 5!', () => {
      const expected = 120;
      const methodsResult = Calculate.factorial(5); 
      // El metodo factorial 5 debe ser igual a 120
      assert.equal(methodsResult, expected);
    });
    // Otro test, ahora 3! me tiene que dar 6
    it('should give 6 if the output is 3!', () => {
      const expected = 6;
      const methodsResult = Calculate.factorial(3);
      // El metodo factorial 3 debe ser igual a 6
      assert.equal(methodsResult, expected);
    });
    // Caso borde: 0! tiene que dar 1
    it('edge case: it should give 1 if the output is 0!', () => {
      const expected = 1;
      const methodsResult = Calculate.factorial(0);
      // El metodo factorial 0 debe ser igual a 1
      assert.equal(methodsResult, expected);
    });
  });
});