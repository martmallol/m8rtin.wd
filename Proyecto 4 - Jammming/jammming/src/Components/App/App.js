import React from 'react';
import './App.css';
// Aqui importo los componentes
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    //searchResults es un array de objetos que contiene elementos como: name, artist, album, id
    //playlistTracks tambien
    this.state = { 
      searchResults: [],
      playlistName: '',
      playlistTracks: [] 
    }; 
    /* Al estado lo utilizo para poner sus elementos como atributos de los componentes 'hijos',
    como por ejemplo 'SearchResults' o 'Playlist'. Estos utilizaran estos atributos como 'props'.*/ 
  }

  // Este metodo agrega un track a la key 'playlistTracks' en el estado del constructor
  addTrack(track) {
    //PONER CODIGO ACA (PUNTO 41/99)
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;