import React from 'react';
import ReactDOM from 'react-dom';
import './TrackList.css';
// Los 'tracks' que estaran en la lista
import {Track} from '../Track/Track'

// Componente que se encarga de la tracklist del usuario
export class TrackList extends React.Component {
    /* El 'map' de abajo hace el render de CADA UNO de los  tracks ubicados 
    en 'this.props.tracks' asignandole cada atributo del objeto 'track' en cuestion. */
    render() {
        return(
            <div className="TrackList">
                {this.props.tracks.map(function(track) {
                    return <Track track={track}
                                  key={track.id}
                                  name={track.name}
                                  artist={track.artist}
                                  album={track.album} />
                })
                }
            </div>
        );
    }
};