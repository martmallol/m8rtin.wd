// Aca esta el componente de la barrita de busqueda de la pag

import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  // Agrego el constructor
  constructor(props) {
    super(props);

    // Seteo el 'state' inicial de SearchBar
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };

    // Binding de los metodos que updatean el valor de alguna key del state
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    // Comunicacion con la API de 'Yelp'
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

  // Metodo que acepta como parametro sortByOption
  getSortByClass(sortByOption) {
    if (this.state.sortBy == sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

  // Metodo que setea el state de un sorting option
  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption});
  }

  // Metodo que setea el state de un term option
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  // Metodo que setea el state de un location option
  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  // Metodo que setea los valores de la informacion pasada a la API de Yelp
  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }

  // Se hace render de los items de la lista por key (itera entre ellas)
  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
            let attr = this.sortByOptions[sortByOption];
            return <li key={attr} 
                       className={this.getSortByClass(attr)}
                       onClick={this.handleSortByChange.bind(this, attr)}>
                         {sortByOption}
                    </li>
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
            <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
            <input placeholder="Where?" onChange={this.handleLocationChange}/>
          </div>
          <div className="SearchBar-submit">
            <a onClick={this.handleSearch}>Let's Go</a>
          </div>
        </div>
    );        
  };
};

// Exporto el componente
export default SearchBar;