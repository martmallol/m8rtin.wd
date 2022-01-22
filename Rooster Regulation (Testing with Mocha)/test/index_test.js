// Importo la libreria de 'assert'
const assert = require('assert');

// Importo el Rooster module
const Rooster = require('../index');

// Escribo un describe para Rooster
describe('For Rooster', () => {
  // Escribo un describe para el metodo .announceDawn
  describe('For .announceDawn', () => {
    // Testea que el metodo efectivamente retorna un rooster call
    it('returns a rooster call', () => {
      // Defino lo que deberia dar
      const expected = 'cock-a-doodle-doo!';
      // Llamo a Rooster.announceDawn y guardo el resultado en una variable
      const myCall = Rooster.announceDawn(); // Dice 'moo'. Voy a index.js y lo corrijo para que el test me de bien
      // Chequeo (con un assert) si el estado actual y el esperado coinciden
      assert.strictEqual(expected, myCall);
    });
  });
  // Escribo un describe para el metodo .timeAtDawn
  describe('For .timeAtDawn', () => {
    // Chequeo que este metodo devuelve su argumento en formato string
    it('returns its argument as a string', () => {
      // Lo que deberia dar
      const expected = '10'; // Me deberia dar un error
      // Lo que da
      const myString = Rooster.timeAtDawn(10);
      // Chequeo si da error
      assert.strictEqual(expected, myString);
    });
    // Chequeo que este metodo da error si le doy un numero menor a 0
    it('throws an error if passed a number less than 0', () => {
      // Lo que deberia dar
      const expected = RangeError; // Me deberia dar un error
      // El numero que voy a utilizar
      const myNumber = -1;
      // Chequeo si da error
      assert.throws(() => {
        // Lo que realmente da
        Rooster.timeAtDawn(myNumber);
      }, expected);
    });
    // Chequeo que este metodo da error si le doy un numero mayor a 23
    it('throws an error if passed a number greater than 23', () => {
      // Lo que deberia dar
      const expected = RangeError; // Me deberia dar un error
      // El numero que voy a utilizar
      const myNumber = 24;
      // Chequeo si da error
      assert.throws(() => {
        // Lo que realmente da
        Rooster.timeAtDawn(myNumber);
      }, expected);
    });
  });
})