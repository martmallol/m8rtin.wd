import React from 'react';
import './App.css';

// Importo los componentes 'Business List' y 'Search Bar'
import BusinessList from '../BusinessList/BusinessList.js';
import SearchBar from '../SearchBar/SearchBar.js';

// Creo el objeto 'business'
// El componente '<Business /> de react va a consumir su info
const business = {
  imageSrc: 'https://content.codecademy.com/programs/react/ravenous/pizza.jpg',
  name: 'MarginOtto Pizzeria',
  address: '1010 Paddington Way',
  city: 'Flavortown',
  state: 'NY',
  zipCode: '10101',
  category: 'Italian',
  rating: 4.5,
  reviewCount: 90
};

// Array con los negocios
const businesses = [
  business, 
  business, 
  business, 
  business,
  business,
  business];

// Lo transformo en componente
class App extends React.Component {
  // Ahora App.js utiliza los componentes creados (los que importe arriba)
  render(){
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar />
        <BusinessList businesses={businesses}/> 
      </div>
    );
  };
}

export default App;
