import React from 'react';
import './App.css';

// Importo los componentes 'Business List' y 'Search Bar'
import BusinessList from '../BusinessList/BusinessList.js';
import SearchBar from '../SearchBar/SearchBar.js';

//Importo Yelp.js para poder utilizar las funcionalidades de la API
import Yelp from '../../util/Yelp';

// Lo transformo en componente
class App extends React.Component {
  // Constructor de la clase
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  // Metodo que agrega funcionalidad. Envia informacion a la API de Yelp
  searchYelp(term, location, sortBy) {
    // Metodo del objeto Yelp
    Yelp.search(term, location, sortBy).then(businesses => 
      { this.setState({ businesses: businesses }) }
      );  
  }
  
  // Ahora App.js utiliza los componentes creados (los que importe arriba)
  render(){
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={businesses}/> 
      </div>
    );
  };
}

export default App;

/* 
Below is a list of some potential features to add to Ravenous:
- Make addresses clickable and have them open the address in Google Maps in a new tab
- Make images clickable and have them open the business’ website in a new tab
- Clicking on a different sorting option automatically requeries the Yelp API, rather than having to 
  manually click “Let’s Go” again
- Implement your own type of sort (for example, by entering a distance or radius from a central location)
- Allow you to search by pressing “Enter” (or “Return”) on your keyboard, as opposed to manually clicking
- Add autocompletion of addresses to the “Location” input
*/
