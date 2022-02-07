import React from 'react';
//Importo los estilos que van a modelar la pag
import { styles } from '../styles';
//Importo propTypes asi mi clase puede tenerlos
import PropTypes from 'prop-types';

const images = {
  copycat: 'https://content.codecademy.com/courses/React/react_photo_copycat.png',
  quietcat: 'https://content.codecademy.com/courses/React/react_photo_quietcat.png'
};

// Esta es mi 'presentantational component class'
export class CopyCat extends React.Component {
  // Solo tengo el metodo de render
  // Por lo tanto, esta clase solo se ocupa de los elementos JSX 
  render() {
    // Como el presentational no tiene 'state', tanto copying como toggleTape los saco de los props del container component
    const { copying, value, toggleTape, handleChange, name } = this.props; // Los props
    // Le agrego estilos del objeto 'style' y tambien agrego un form con el <input />
    // Agrego un <p> que hace que el gato hable o no dependiendo del estado del input en el container 
    return (
      <div style={styles.divStyles}>
        <h1 style= {{marginBottom: 80}}>Copy Cat {name || 'Tom'}</h1>
        <input 
            type='text'
            value={value}
            onChange={handleChange} />
        <img 
          style={styles.imgStyles}
          alt='cat'
          src={copying ? images.copycat : images.quietcat}
          onClick={toggleTape} />
        <p>{copying && value}</p>
      </div>
    );
  };
}

//Agrego la propiedad de propTypes
CopyCat.propTypes = {
  copying: PropTypes.bool.isRequired,
  toggleTape: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string // Opcional, no requerido
};