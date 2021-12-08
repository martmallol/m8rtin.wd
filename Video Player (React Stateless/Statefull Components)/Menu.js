import React from 'react';

export class Menu extends React.Component {
  // Creo un constructor para poder bindear a handleClick si actualizo el this
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); // Binding
  } 
  // Creo esta funcion para que chooseVideo no reciba un objeto como parametro (ya que admite strings nomas)
  handleClick(e) {
    const text = e.target.value;
    this.props.chooseVideo(text);
  }
  // Agrego al form la funcion chooseVideo como 'event-listener'. Pongo handleClick asi, al recibir un objeto, le asigno a chooseVideo el valor de dicho objeto. 
  render() {
    return (
      <form onClick={this.handleClick}>
        <input type="radio" name="src" value="fast" /> fast
        <input type="radio" name="src" value="slow" /> slow
        <input type="radio" name="src" value="cute" /> cute
        <input type="radio" name="src" value="eek" /> eek
      </form>
    );
  }
}