import { animals } from './animals';
//Importo librerias de React
import React from 'react';
import ReactDOM from 'react-dom';

//Variable del titulo
const title = '';

//Fondo de la pagina
const background = (
  <img 
  className='background' 
  alt='ocean'
  src='/images/ocean.jpg'/>
  );

//Imagenes de los animales
const images = [];
for(const animal in animals) {
  images.push(
    <img 
      key={animal}
      className='animal'
      alt={animal}
      src={animals[animal].image}
      ariaLabel={animal}
      role='button'
      onClick={displayFact}
    />
  )
};

//Funcion event listener para que tire un fact random
function displayFact(e){
  const selectedAnimal = e.target.alt;
  const animalInfo = animals[selectedAnimal]
  const optionIndex = Math.floor(Math.random() * animalInfo.facts.length);
  const funFact = animalInfo.facts[optionIndex];
  document.getElementById('fact').innerHTML = funFact;
}

//Variable del JSX usando 'ternary operator'
const animalFacts = (
  <div>
    <h1>{title === '' ? 'Click an animal for a fun fact' : title}</h1>
    {background}
    <p id='fact'></p>
    <div className='animals'>{images}</div>
  </div>
  );

//Render con react para poder leer el titulo
ReactDOM.render(animalFacts, document.getElementById('root'));





