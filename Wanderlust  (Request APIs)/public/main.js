// Foursquare API Info
// Mi API Key de Foursquare
const foursquareKey = 'blablablalbla'; 
// URL de place search API endpoint
const url = 'https://api.foursquare.com/v3/places/search?near=';
// Le agrego una query al final de la URL con 'near' como parametro

// OpenWeather Info
//Mi API Key sacada de la pag de Open Weather
const openWeatherKey = 'blalbalbla';
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

const getForecast = () => {
  
};


// Render functions
const renderPlaces = (places) => {
  $placeDivs.forEach(($place, index) => {
    // Add your code here:

    const placeContent = '';
    $place.append(placeContent);
  });
  $destination.append(`<h2>${places[0].location.locality}</h2>`);
};

const renderForecast = (forecast) => {
  const weatherContent = '';
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $placeDivs.forEach(place => place.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getPlaces();
  getForecast();
  return false;
}

$submit.click(executeSearch);