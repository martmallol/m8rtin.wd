import React from 'react';
import ReactDOM from 'react-dom';
// Importo el objeto "only-JSX" CopyCat
import { CopyCat } from '../components/CopyCat';

const images = {
  copycat: 'https://content.codecademy.com/courses/React/react_photo_copycat.png',
  quietcat: 'https://content.codecademy.com/courses/React/react_photo_quietcat.png'
};

// La clase 'container' que se encarga de la logica
class CopyCatContainer extends React.Component {
    constructor(props) {
    super(props);

    this.state = { 
      copying: true,
      input: '' // Agrego el estado del input (para el form),
    };

    this.toggleTape = this.toggleTape.bind(this);
    this.handleChange = this.handleChange.bind(this); // Binding
  }

  toggleTape() {
    this.setState({copying: !this.state.copying})
  }
  // Metodo que indica el cambio de estado cuando el usuario llena un form
  handleChange(e) {
    // Cambio el estado con el valor de e que seria el valor de <Input />
    this.setState({input: e.target.value})
  }

  render() {
    const copying = this.state.copying;
    const toggleTape = this.toggleTape;
    // Devuelvo la parte JSX a renderizar (de esto se encarga el presentational)
    // Le agrego los props que afectan el state de esta clase
    return (
    <CopyCat 
      copying={copying}
      toggleTape={toggleTape}
      value={this.state.input}
      handleChange={this.handleChange}
      name={"Gas"}
    />
    );
  }
}

// El renderizado
ReactDOM.render(<CopyCatContainer />, document.getElementById('app'));