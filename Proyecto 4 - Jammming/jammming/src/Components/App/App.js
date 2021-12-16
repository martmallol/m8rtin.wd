import React from 'react';
import './App.css';
// Aqui importo los componentes
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
// Objeto que se encarga del fetch de la API de Spotify
import Spotify from '../../util/Spotify';

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
    
    // Binding de metodos que cambien el estado del componente
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Este metodo agrega un track a la key 'playlistTracks' en el estado del constructor
  addTrack(track) {
    // Si el tema no esta en la playlist, lo agrega
    if (! this.state.playlistTracks.includes(track)) {
      const newPlaylist = this.state.playlistTracks.push(track); // Playlist con el nuevo tema
      this.setState( { playlistTracks: newPlaylist } ); // Actualizo la playlist del estado ??RETURN??
    }
  }

  // Este metodo elimina un track en la key 'playlistTracks' en el estado del constructor
  removeTrack(track) {
    // Busco en la playlist por el id del track
    if(this.state.playlistTracks.find( myTrack => myTrack.id === track.id)) {
        const newPlaylist = this.state.playlistTracks.remove(track); // Playlist sin el tema 
        this.setState( { playlistTracks: newPlaylist } ); // Actualizo la playlist del estado
    }
  }

  // Cambia el nombre de la playlist
  updatePlaylistName(name) {
    this.setState( { playlistName: name } );
  }

  // Guarda la playlisy creada en la cuenta de un usuario
  savePlaylist() {
    const tracks = this.state.playlistTracks;
    // Array donde estaran los uris de cada tema de la playlist
    // Que es un uri? -> https://developer.spotify.com/documentation/web-api/
    const trackURIs = tracks.map(function(x) {
      return `spotify:${x.name}:${x.id}`;
    });
  }

  // Metodo para buscar canciones
  search(term) {
    // Utiliza el objeto de Spotify que hace un fetch a la API
    Spotify.search(term).then( searchResults => {
      // Al realizar la busqueda, actualiza el estado de los resultados de busqueda en el objeto 'App' 
      this.setState({ searchResults: searchResults })
    }); 
  }

  /* Los elementos del <Playlist /> siempre van a dar un isRemoval = true porque justamente forman parte 
  de la playlist. Mientras que los elementos de <SearchResults /> siempre dan un isRemoval = false porque
  no estan en la playlist y por lo tanto pueden ser agregados. */
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack} 
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;