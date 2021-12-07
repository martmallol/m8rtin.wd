// Aca esta el componente de la barrita de busqueda de la pag

import React from 'react';
import './SearchBar.css';

// Comunicacion con la API de 'Yelp'
const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
    // Se hace render de los items de la lista por key (itera entre ellas)
    renderSortByOptions() {
      return Object.keys(sortByOptions).map
          (sortByOption => {
              let attr = sortByOptions[sortByOption];
              return <li key={attr}>{sortByOption}</li>
          });
    };
    // Metodo render de toda la vida
    render(){
      return (
          <div className="SearchBar">
            <div className="SearchBar-sort-options">
              <ul>
                {this.renderSortByOptions()}
              </ul>
            </div>
            <div className="SearchBar-fields">
              <input placeholder="Search Businesses" />
              <input placeholder="Where?" />
            </div>
            <div className="SearchBar-submit">
              <a>Let's Go</a>
            </div>
          </div>
      );        
    };
};

// Exporto el componente
export default SearchBar;