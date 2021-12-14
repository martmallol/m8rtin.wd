import React from 'react';
import ReactDOM from 'react-dom';
import './Playlist.css';
// Importo el componente 'TrackList'
import {TrackList} from '../TrackList/TrackList'

// Componente que se encarga de las playlists del usuario
export class Playlist extends React.Component {
    render() {
        return(
            <div className="Playlist">
                <input defaultValue={'New Playlist'}/>
                <TrackList tracks={this.props.playlistTracks}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
};