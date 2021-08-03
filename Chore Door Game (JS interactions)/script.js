//Variables puertas
let doorImage1 = document.getElementById('door1'); //Selecciono al elemento con el id 'door1'
let doorImage2 = document.getElementById('door2'); //Elemento con el id 'door2'
let doorImage3 = document.getElementById('door3'); //Elemento con el id 'door3'

//Variables imagenes
let botDoorPath = "https://content.codecademy.com/projects/chore-door/images/robot.svg" //Puerta abierta donde esta el bot
let beachDoorPath = "https://content.codecademy.com/projects/chore-door/images/beach.svg"; //Puerta abierta donde esta la playa
let spaceDoorPath = "https://content.codecademy.com/projects/chore-door/images/space.svg"; //Puerta abierta donde esta el espacio

//Cuando clickeo las puertas
doorImage1.onclick = () => { //Lo que sucede cuando se clickea una puerta cerrada
  doorImage1.src = botDoorPath; //Cambio el src de la imagen
}; 

doorImage2.onclick = () => {
  doorImage2.src = beachDoorPath; //Cambio el src de la imagen
};
doorImage3.onclick = () => {
  doorImage3.src = spaceDoorPath; //Cambio el src de la imagen
};