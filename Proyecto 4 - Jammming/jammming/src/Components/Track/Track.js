import React from 'react';
import ReactDOM from 'react-dom';
import './Track.css';

// Componente que se encarga de cada uno de los tracks que estaran en la tracklist
export class Track extends React.Component {
    // Determina si es removible el track (o no) 
    renderAction() {
        let action;
        isRemoval ? action = '-' : action = '+';
        return action;
    }

    render() {
        return(
            <div class="Track">
                <div className="Track-information">
                    <h3><!-- track name will go here --></h3>
                    <p><!-- track artist will go here--> | <!-- track album will go here --></p>
                </div>
                <button className="Track-action">{this.renderAction}</button>
            </div>
        );
    }
};