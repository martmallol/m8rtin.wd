// Links de ayuda:
// https://developer.spotify.com/dashboard/
// https://developer.spotify.com/documentation/general/guides/authorization/

// El token de acceso del user
const accessToken;
const clientID;
const redirectURI = "http://localhost:3000/";

const Spotify = {
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
    }
}

export default Spotify;