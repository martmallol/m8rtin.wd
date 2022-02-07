/* Testeo tipeando en la consola: 
  node test/lodash.js
  node test/clamp.js (metodo clamp)
  node test/in-range.js (metodo inRange)
  node test/words.js
  node test/pad.js
  node test/has.js
  node test/invert.js
  node test/find-key.js
  node test/drop.js
  node test/drop-while.js
  node test/chunk.js
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
  
  // Invierte el valor de las keys y sus valores entre si
  invert(object) {
    let i = 0;
    let myKeys = Object.keys(object);
    while(i < myKeys.length) {
      let key = myKeys[i];
      let keysValue = object[key];
      object[keysValue] = key;
      delete object[key];
      i++;
    }
    return object;
  },

  // Si la funcion 'predicate' devuelve 'true' al pasarle el valor de una key del objeto, la funcion devuelve la key. Sino, devuelvo undefined.
  findKey(object, predicate) {
    let i = 0;
    let actualKey;
    let gotIt = false;
    let myKeys = Object.keys(object);

    while( (i < myKeys.length) && !gotIt ) {
      actualKey = myKeys[i];
      gotIt = predicate(object[actualKey]);
      i++;
    }

    if(gotIt) {
      return actualKey;
    } else {
      return undefined;
    }
  }, 

  // Si especifico el 'num', borro los primeros 'num' elementos del array, si no, borro el primero.
  drop(array, num) {
    //Si se especifico el numero de elementos a dropear del array
    if (num) {
      let len = array.length;
      return array.slice(num, len) //Me quedo con el sub array que empieza en el indice 'num'
    } 
    // Si no se especifico el nro de elementos a dropear
    else {
      array.shift(); // Elimino el primer elemento
      return array; 
    }
  }, 
  // Mientras "predicate(array[i], i, array)" de truthy, saco el primer elemento del array. 
  dropWhile(array, predicate) {
    let i = 0;
    let truthy = true;
    let len = array.length
    const newArr = Array.from(array); // Por copia
    while ( (i < len) && truthy ) {
      truthy = predicate(array[i], i, array);
      console.log(array);
      if (truthy) {
        newArr.shift();
      }
      i++;
    }
    return newArr;
  }, 
  
  // Divide mi array en pedazos iguales (a menos que esto sea imposible de realizar, en ese caso el ultimo pedazo sera el mas chico). 
  //Si no se especifica la longitud de cada pedazo, se parte el arrray en "array.length" sub arrays
  chunk(array, size) {
    let chunksArray = [];
    // Si se pasa un tamano como parametro
    if (size) {
      let chunkLength = Math.floor(array.length / size);
      //Si el tamano es par
      let i = 0;
      while( (i + chunkLength) <= array.length ) {
        let subArray = array.slice(i, i + chunkLength);
        chunksArray.push(subArray);
        i += chunkLength;
      }
      
      // Si NO puede ser dividido en partes iguales
      if (array.length != chunkLength * size) {
        // Devuelvo el ultimo pedazo que sera mas chico que el resto
        let lastChunk = array.slice(i, array.length);
        chunksArray.push(lastChunk);
      }
    } 
    // Si NO se pasa un tamano como parametro
    else {
      let i = 0;
      while (i < array.length) {
        chunksArray.push([array[i]]);
        i++;
      }
    }
    // Devuelvo el array dividido en subarrays
    return chunksArray;
  }
};

// Do not write or modify code below this line.
module.exports = _;