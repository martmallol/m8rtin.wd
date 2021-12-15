// Links de ayuda:
// https://developer.spotify.com/dashboard/
// https://developer.spotify.com/documentation/general/guides/authorization/

// El token de acceso del user
const accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        } else {
            // Lo obtengo mediante el 'Implicit Grant Flow'
            // Ayuda: https://developer.spotify.com/documentation/general/guides/authorization/implicit-grant/
            
            // Con window.location,href obtenemos la URL de la pagina actual
            // Y con el metodo .match() obtenemos la porcion de la URL donde esta el access token en primer lugar, y el expires in en segundo
            const accessToken = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
            // (Punto 79)
        }
    }
}

export default Spotify;