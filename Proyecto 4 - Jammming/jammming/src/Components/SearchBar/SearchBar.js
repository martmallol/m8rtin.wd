import React from 'react';
import ReactDOM from 'react-dom';
import './SearchBar.css';

// Componente que se encarga de la barra de busqueda de la pagina
export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        // Binding
        this.search = this.search.bind(this); 
        this.handleTermChange = this.handleTermChange.bind(this); 
    }
    
    // Metodo para agregar una busqueda
    search() {
        // Pone el estado del 'term' en la funcion 'search' de 'App.js'
        this.props.onSearch(this.state.term);
    }

    // Se encarga de cambiar el estado del 'term' de la barra de busqueda
    handleTermChange(event) {
        this.setState( { term: event.target.value } ); 
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <button className="SearchButton">SEARCH</button>
            </div>
        );
    }
};