import React from 'react';
import './App.css';

// Importo los componentes 'Business List' y 'Search Bar'
import BusinessList from '../BusinessList/BusinessList.js';
import SearchBar from '../SearchBar/SearchBar.js';

// Lo transformo en componente
class App extends React.Component {
  // Ahora App.js utiliza los componentes creados (los que importe arriba)
  render(){
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar />
        <BusinessList /> 
      </div>
    );
  };
}

export default App;
