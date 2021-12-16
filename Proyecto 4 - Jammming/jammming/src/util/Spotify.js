// Links de ayuda:
// https://developer.spotify.com/dashboard/
// https://developer.spotify.com/documentation/general/guides/authorization/

// El token de acceso del user
const accessToken;
// Los datos de aca abajo se pueden encontrar en mi App de Spotify 'Jammming': https://developer.spotify.com/dashboard/applications
const clientID = '7e1454b5db444a408d8a935f2680e276';
const redirectURI = "http://localhost:3000/";

const Spotify = {
    // Metodo que trata sobre la funcionalidad para obtener un 'access token'
    getAccessToken() {
        // Si ya tengo mi access token
        if(accessToken) {
            return accessToken;
        } 
        // Si no lo tengo
        else {
            // Lo obtengo mediante el 'Implicit Grant Flow'
            // Ayuda: https://developer.spotify.com/documentation/general/guides/authorization/implicit-grant/
            
            // Con window.location,href obtenemos la URL de la pagina actual
            // Y con el metodo .match() obtenemos la porcion de la URL donde esta el access token en primer lugar, y el expires in en segundo
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
            // (Punto 79)

            // Si estaban en la URL
            if(accessTokenMatch && expiresInMatch) {
                // Los agarro de los matches que obtuve arriba
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]); // Esto me sirve para saber cuando se limpia el accessToken

                // Esto limpia los parametros de la URL, permitiendome acceder a un nuevo access token cuando venza
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            } 
            // Si no estaban en la URL
            else {
                // Redirecciono al usuario a la siguiente URL
                window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            }
        }
    },
    // Metodo que muestra la lista de tracks davueltos por la busqueda mediante un GET Request
    search(term) {
        const myAccessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
                     {  headers: { Authorization: `Bearer ${myAccessToken}` }  }
                     ).then(response => {
                         return response.json(); // Convierte la respuesta del Request en .json
                     }).then(jsonResponse => {
                         // Si la respuesta no tiene tracks, devolvemos un array vacio
                         if(!jsonResponse.tracks) {
                             return [];
                         } 
                         // Si la respuesta tiene tracks, devolvemos una lista con todos los tracks obtenidos
                         else {
                             return jsonResponse.tracks.items.map(track => ({
                                 id: track.id,
                                 name: track.name,
                                 artist: track.artists[0].name,
                                 album: track.album.name,
                                 uri: track.uri
                             }));
                         }
                     })
    }
}

export default Spotify;