// Foursquare API Info
// Mi API Key de Foursquare
const foursquareKey = 'blablabla'; 
// URL de place search API endpoint
const url = 'https://api.foursquare.com/v3/places/search?near=';
// Le agrego una query al final de la URL con 'near' como parametro

// OpenWeather Info
//Mi API Key sacada de la pag de Open Weather
const openWeatherKey = 'blablablabla';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $placeDivs = [$("#place1"), $("#place2"), $("#place3"), $("#place4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Objeto que contiene informacion adicional sobre la Request que se realizara a la api de Foursquare
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: foursquareKey
  }
};

// Add AJAX functions here:
// Esta funcion va a ser 'asynchronous' y va adevolver una Promesa
const getPlaces = async () => {
  // La variable va a tener como valor lo que el usuario escriba
  const city = $input.val();
  // Contiene la url del endpoint de Foursquare, el valor que ingreso el usuario, y tiene como limite 10 lugares
  const urlToFetch = `${url}&${city}&limit=10`;
  // Realizo un try (si puedo hago esto) catch (sino tiro error)
  try {
    // Creo un fetch. Este envia el objeto 'options' al endpoint de la API
    // Ademas, devuelve una promesa que luego del await, se convierte en una response, 
    //conteniendo el status de la promesa con informacion que la API recogio
    const response = await fetch(urlToFetch, options);
    // Si me devolvio una respuesta...
    if (response.ok) {
      // Convierto la respuesta a un 'JSON object'
      const jsonResponse = await response.json();
      // Logueo la respuesta a la consola
      console.log(jsonResponse);
      // El jsonResponse object tiene dos propiedades: 'context' y 'results'
      // Una tiene coordenadas geograficas y la otra una lista de 10 objetos
      // cada uno representando un lugar distinto

      // Guardo los lugares pertenecientes a jsonResponse.results
      const places = jsonResponse.results;
      // Logueo la variable a la consola
      console.log(places);

      // Devuelvo el array places
      return places;
    }
  } catch (error) {
    console.log(error);
  }
};

// Esta funcion va a ser 'asynchronous' y va adevolver una Promesa
const getForecast = async () => {
  // Mi url con la direc de la pag, el parametro del valor del input del usuario, y la API Key de la pagina Weather
  const urlToFetch = `${weatherUrl}?q=${input.val()}&APPID=${openWeatherKey}`;
  // Realizo un try (si puedo hago esto) catch (sino tiro error)
  try {
    // Creo un fetch, devuelve una promesa que luego del await, se convierte en una response, 
    // conteniendo el status de la promesa con informacion que la API recogio
    const response = await fetch(urlToFetch);
    // Si me devolvio una respuesta...
    if (response.ok) {
      // Convierto la respuesta a un 'JSON object'
      const jsonResponse = await response.json();
      // Logueo la respuesta a la consola
      console.log(jsonResponse);
      // Devuelvo la respuesta que buscaba
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};


// Render functions

// En places obtengo todos los lugares de la API
const renderPlaces = (places) => {
  // En $placeDivs renderizo la informacion devuelta por la Foursquare API
  $placeDivs.forEach(($place, index) => {
    // Place object (+ info: https://developer.foursquare.com/reference/response-fields)
    const place = places[index];
    const placeIcon = place.categories[0].icon
    const placeImgSrc = `${placeIcon.prefix}bg_64${placeIcon.suffix}`;
    // Construyo el HTML con la info del lugar que me devolvio la API
    // Uso una funcion llamada 'createPlaceHTML'. Se encuentra en public/helpers.js
    // Renderizo la info
    const placeContent = createPlaceHTML(place.name, place.location, placeImgSrc);
    $place.append(placeContent);
  });
  $destination.append(`<h2>${places[0].location.locality}</h2>`);
};

// En forecast obtengo el clima de la API (el jsonResponse devuelto por getForecast()). Voy a renderizar la info a $weatherDiv.
const renderForecast = (forecast) => {
  // Construyo el HTML (transformo el json object a un html object)
  // Uso una funcion llamada 'createWeatherHTML'. Se encuentra en public/helpers.js
  // Renderizo la info
  const weatherContent = createWeatherHTML(forecast);
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $placeDivs.forEach(place => place.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  // Obtengo los lugares de la API, y luego, los renderizo 
  getPlaces().then(places => renderPlaces(places));
  // Obtengo el clima de la API, y luego, lo renderizo
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch);