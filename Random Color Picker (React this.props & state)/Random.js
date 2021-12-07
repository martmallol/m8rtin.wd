import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from './Button'; //Importo 'Button'

class Random extends React.Component {
  //Agrego constructor
  constructor(props) {
    super(props);
    this.state = { color: [100, 15, 70] };
    this.handleClick = this.handleClick.bind(this) //El metodo usa 'this' en su body
  };
  componentDidMount() {
    this.applyColor();
  }

  componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  }

  formatColor(ary) {
    return 'rgb(' + ary.join(', ') + ')';
  }

  isLight() {
    const rgb = this.state.color;
    return rgb.reduce((a,b) => a+b) < 127 * 3;
  }

  applyColor() {
    const color = this.formatColor(this.state.color);
    document.body.style.background = color;
  }

  chooseColor() {
    const random = [];
    for (let i = 0; i < 3; i++) {
      random.push(Math.floor(Math.random()*256));
    }
    return random;
  }
  //Agrego metodo que me permite clickear sobre el boton
  handleClick() {
    this.setState({ color: this.chooseColor() });
  };
  //Agrego el codigo del color que veo en pantalla y el boton
  render() {
    return (
      <div>
        <h1 className={this.isLight() ? 'white' : 'black'}>
          Your color is {this.formatColor(this.state.color)}
        </h1>
        <Button light={this.isLight} onClick={this.props.onClick}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Random />, 
  document.getElementById('app')
);