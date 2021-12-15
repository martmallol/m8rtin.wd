import React from 'react';
import ReactDOM from 'react-dom';
import './Track.css';

// Componente que se encarga de cada uno de los tracks que estaran en la tracklist
export class Track extends React.Component {
    constructor(props) {
        super(props);
        // Binding de los metodos que afecten el estado del componente
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    // Determina si es removible el track (o no) (botoncito de + / -) 
    renderAction() {
        let action;
        if (this.props.isRemoval) {
            // El onClick hace que se saque el track al clickear el '-' mediante la funcion 'removeTrack'
            return <button className="Track-action"
                           onClick={this.removeTrack}>-</button>;
        } else {
            // El onClick hace que se agregue el track al clickear el '+' mediante la funcion 'addTrack'
            return <button className="Track-action" 
                           onClick={this.addTrack}>+</button>;
        }
    }

    // Metodo para agregar un track
    addTrack() {
        // Pone este track en la funcion 'addtrack' de 'App.js'
        return this.props.onAdd(this.props.track); 
    }

    // Metodo para sacar un track
    removeTrack() {
        // Pone este track en la funcion 'removeTrack' de 'App.js'
        return this.props.onRemove(this.props.track);
    }

    render() {
        return(
            <div class="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction}
            </div>
        );
    }
};