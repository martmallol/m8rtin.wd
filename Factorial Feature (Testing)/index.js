const Calculate = {
    // Agrego el metodo factorial
    factorial(n) {
      let i = n;
      let result = 1;
      while (i != 0) {
        result *= i;
        i--;
      }
      return result;
    }
  }
  
  module.exports = Calculate;
  
  
  