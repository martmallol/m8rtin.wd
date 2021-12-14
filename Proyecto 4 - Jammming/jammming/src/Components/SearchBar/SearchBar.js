import React from 'react';
import ReactDOM from 'react-dom';
import './SearchBar.css';

// Componente que se encarga de la barra de busqueda de la pagina
export class SearchBar extends React.Component {
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton">SEARCH</button>
            </div>
        );
    }
};