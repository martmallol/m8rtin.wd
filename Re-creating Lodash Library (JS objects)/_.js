/* Testeo tipeando en la consola: 
  node test/lodash.js
  node test/clamp.js (metodo clamp)
  node test/in-range.js (metodo inRange)
  node test/words.js
  node test/pad.js
*/

// Objeto donde estaran los metodos 
const _ = {
    // Si el nro es menor al rango, devuelvo el extremo menor del rango.
    // Si es el nro es mayor, devuelvo el extremo mayor del rango.
    // Si el nro esta en el rango, devuelvo mi nro.
    clamp(number, lowerBound, upperBound) {
      if (number < lowerBound) {
        return lowerBound;
      } else if (number > upperBound) {
        return upperBound;
      } else {
        return number;
      }
    },
  
    // Si el numero entra en el rango, devuelve true, sino, false
    // Si no hay un end, start = 0 y end = start
    // Si start > end swapeo los valores
    inRange(number, start, end) {
      // Casos borde
      if(!end) {
        end = start;
        start = 0;
      } else if (start > end) {
        [start, end] = [end, start] // Swapeo valores
      }
      //Resolucion
      return !(number < start || number >= end);
    },
  
    // Particiona el string en un array de palabras
    words(string) {
      return string.split(' ');
    },
  
    // Agrega espacios a la izquierda y derecha de la palabra para llegar a la longitud pedida
    // Si la cantidad de espacios a agregar es impar, se agrega el espacio extra en el extremo derecho (se redondea para arriba)
    pad(string, length) {
      if(string.length >= length) {
        return string;
      } else {
        const padding = (length - string.length) / 2;
        let roundDown = Math.floor(padding);
        let roundUp = Math.ceil(padding);
  
        let leftPad = '';
        let rightPad = '';
        while (roundDown != 0) {
          leftPad += ' ';
          rightPad += ' ';
          roundDown -= 1;
          roundUp -= 1;
        }
  
        if(roundDown != roundUp) {
          rightPad += ' '
        }
  
        let res = leftPad + string + rightPad;      
        return res;
      }
    },
    // Me dice si el objeto incluye o no la key pasada como parametro
    has(object, key) {
      if(object[key]) {
        return true;
      } else {
        return false;
      }
    },
    
    invert(object) {
      
    }
};
  
// Do not write or modify code below this line.
module.exports = _;