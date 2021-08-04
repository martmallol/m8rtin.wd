//Variables puertas
let doorImage1 = document.getElementById('door1'); //Selecciono al elemento con el id 'door1'
let doorImage2 = document.getElementById('door2'); //Elemento con el id 'door2'
let doorImage3 = document.getElementById('door3'); //Elemento con el id 'door3'

//Variables imagenes
let botDoorPath = "https://content.codecademy.com/projects/chore-door/images/robot.svg" //Puerta abierta donde esta el bot
let beachDoorPath = "https://content.codecademy.com/projects/chore-door/images/beach.svg"; //Puerta abierta donde esta la playa
let spaceDoorPath = "https://content.codecademy.com/projects/chore-door/images/space.svg"; //Puerta abierta donde esta el espacio

//Variables juego
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let closedDoorPath = "https://content.codecademy.com/projects/chore-door/images/closed_door.svg";
let startButton = document.getElementById('start');
let currentlyPlaying = true;

//Funcion randomizadora
const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors); //Selecciona una puerta de manera random entre 0 y 2. (el math.floor lo redondea para abajo)
  //Dependiendo el nro random que me toco, ahi es la puerta donde ira el bot y en el resto iran las otras imagenes
  if (choreDoor == 0) { //Primera puerta
    openDoor1 = botDoorPath; //Robot
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor == 1) { //Segunda puerta
    openDoor1 = spaceDoorPath;
    openDoor2 = botDoorPath; //Robot
    openDoor3 = beachDoorPath;
  } else { //Tercera puerta
    openDoor1 = spaceDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = botDoorPath; //Robot
  }
}

//Funcion que checkea si la puerta que acabo de abrir es el robot
const isBot = (door) => {
  //Si la puerta tiene al bot
  return door.src == botDoorPath; 
};

//Funcion que se asegura de bloquear el click a una puerta ya abierta
const isClicked = (door) => {
  //Si la puerta esta cerrada
  if(door.src == closedDoorPath) {
    return false; //No fue clickeada
  } else {  //Esta abierta
    return true; //Ya fue clickeada anteriormente
  }
};

//Funcion que reordena variables y chequea el estado actual
const playDoor = (door) => {
  numClosedDoors --; //Resta el nro de puertas cerradas
  if(numClosedDoors === 0) { //Si no hay puertas cerradas, termina el juego
    gameOver('win'); //Termina el juego victorioso
  } else if (isBot(door)) { //Si la puerta que acabo de abrir es el robot
    gameOver(); //Termina el juego derrotado
  }
};

//Cuando clickeo las puertas
doorImage1.onclick = () => { //Lo que sucede cuando se clickea una puerta cerrada
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1; //Cambio el src de la imagen
    playDoor(doorImage1); //Chequeo si se termino el juego
  }
}; 

doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2; //Cambio el src de la imagen
    playDoor(doorImage2); //Chequeo si se termino el juego
  }
};

doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3; //Cambio el src de la imagen
    playDoor(doorImage3); //Chequeo si se termino el juego
  }
};

//Cuando cliqueo en el boton de start/restart
startButton.onclick = () => {
  if(!currentlyPlaying) { //Solo se hace restart si se termino el juego o no se arranco a jugar
    startRound();
  }
}

//Funcion que hace restart del juego una vez que este termina, o lo empieza si nunca se jugo
const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good Luck!';
  currentlyPlaying = true;
  //Me aseguro de que cada variable 'openDoor' tenga un valor random gracias al llamado de esta funcion
  randomChoreDoorGenerator();
};

//Funcion cuando termina el juego
const gameOver = (status) => {
  if (status == 'win') { //Si ganaste el juego
    startButton.innerHTML = 'You win! Play again?';
  } else { //Perdiste
    startButton.innerHTML = 'Game over! Play again?';
  }
  currentlyPlaying = false;
};

//Llamo a esta funcion para empezar un juego
startRound();
