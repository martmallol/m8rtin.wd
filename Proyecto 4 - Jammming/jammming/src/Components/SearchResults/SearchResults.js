import React from 'react';
import ReactDOM from 'react-dom';
import './SearchResults.css';
// Importo el componente 'TrackList'
import {TrackList} from '../TrackList/TrackList'

// Componente que se encarga de los resultados de la busqueda de canciones
export class SearchResults extends React.Component {
    render() {
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults}
                           onAdd={this.props.onAdd}
                           isRemoval={false}/>
            </div>
        );
    }
};