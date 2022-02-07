// The keys and notes variables store the piano keys
const keys = ['c-key', 'd-key', 'e-key', 'f-key', 'g-key', 'a-key', 'b-key', 'high-c-key', 'c-sharp-key', 'd-sharp-key', 'f-sharp-key', 'g-sharp-key', 'a-sharp-key'];
const notes = [];
keys.forEach(function(key){
  notes.push(document.getElementById(key));
})

// Write named functions that change the color of the keys below
//Cambia el color del fondo de una tecla
const keyPlay = (element) => {
  element.target.style.backgroundColor = 'cyan';
}

//La tecla vuelve a tener su color original
const keyReturn = (element) => {
  element.target.style.backgroundColor = '';
}

// Write a named function with event handler properties
//La funcion muestra lo que sucede al tocar una tecla del piano
const note = (element) => {
  element.onmousedown = keyPlay;
  element.onmouseup = keyReturn;
}

// Write a loop that runs the array elements through the function
//A cada tecla se le asigna la propiedad que al tocarla cambia de color.
notes.forEach(element => note(element));

// These variables store the buttons that progress the user through the lyrics
let nextOne = document.getElementById('first-next-line');
let nextTwo = document.getElementById('second-next-line');
let nextThree = document.getElementById('third-next-line');
let startOver = document.getElementById('fourth-next-line');

// This variable stores the '-END' lyric element
let lastLyric = document.getElementById('column-optional');

// These statements are "hiding" all the progress buttons, but the first one
nextTwo.hidden = true;
nextThree.hidden = true;
startOver.hidden= true;

// Write anonymous event handler property and function for the first progress button
nextOne.addEventListener('click', function() {
  nextTwo.hidden = false; //'Line 3' aparece
  nextOne.hidden = true; // 'Line 2' se esconde
  //Cambian estas notas
  document.getElementById('letter-note-five').innerHTML = 'D';
  document.getElementById('letter-note-six').innerHTML = 'C';
})

// Write anonymous event handler property and function for the second progress button
nextTwo.addEventListener('click', function() {
  nextThree.hidden = false; //'Line 4' aparece
  nextTwo.hidden = true; // 'Line 3' se esconde
  //Cambian estas palabras
  document.getElementById('word-five').innerHTML = 'DEAR';
  document.getElementById('word-six').innerHTML = 'FRI-';
  //Aparece la palabra '-END'
  lastLyric.style.display = 'inline-block';
  //Cambian estas notas
  document.getElementById('letter-note-three').innerHTML = 'G';
  document.getElementById('letter-note-four').innerHTML = 'E';
  document.getElementById('letter-note-five').innerHTML = 'C';
  document.getElementById('letter-note-six').innerHTML = 'B';
})

// Write anonymous event handler property and function for the third progress button
nextThree.addEventListener('click', function() {
  startOver.hidden = false; //'Reset' aparece
  nextThree.hidden = true; //'Line 4' se esconde
  //Cambian estas palabras
  document.getElementById('word-one').innerHTML = 'HAP-';
  document.getElementById('word-two').innerHTML = 'PY';
  document.getElementById('word-three').innerHTML = 'BIRTH';
  document.getElementById('word-four').innerHTML = 'DAY';
  document.getElementById('word-five').innerHTML = 'TO';
  document.getElementById('word-six').innerHTML = 'YOU!';
  //Cambian estas notas
  document.getElementById('letter-note-one').innerHTML = 'F';
  document.getElementById('letter-note-two').innerHTML = 'F';
  document.getElementById('letter-note-three').innerHTML = 'E';
  document.getElementById('letter-note-four').innerHTML = 'C';
  document.getElementById('letter-note-five').innerHTML = 'D';
  document.getElementById('letter-note-six').innerHTML = 'C';
  //Se esconde la palabra '-END'
  lastLyric.style.display = 'none';
})

// This is the event handler property and function for the startOver button (cuando se resetea la cancion)
startOver.onclick = function() {
  nextOne.hidden = false;
  startOver.hidden = true;
   document.getElementById('word-one').innerHTML = 'HAP-';
  document.getElementById('letter-note-one').innerHTML = 'G';
  document.getElementById('word-two').innerHTML = 'PY';
  document.getElementById('letter-note-two').innerHTML = 'G';
  document.getElementById('word-three').innerHTML = 'BIRTH-';
  document.getElementById('letter-note-three').innerHTML = 'A';
  document.getElementById('word-four').innerHTML = 'DAY';
  document.getElementById('letter-note-four').innerHTML = 'G';
  document.getElementById('word-five').innerHTML = 'TO';
  document.getElementById('letter-note-five').innerHTML = 'C';
  document.getElementById('word-six').innerHTML = 'YOU';
  document.getElementById('letter-note-six').innerHTML = 'B';
}