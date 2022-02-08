import React from 'react';
import ReactDOM from 'react-dom';
import './Playlist.css';
// Importo el componente 'TrackList'
import {TrackList} from '../TrackList/TrackList'

// Componente que se encarga de las playlists del usuario
export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        // Binding de los metodos que cambian el estado del componente
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    // Se encarga del cambio de nombre de la playlist
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return(
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks}
                           onRemove={this.props.onRemove} 
                           isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
};