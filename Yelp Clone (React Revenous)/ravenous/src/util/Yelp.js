// Mi API extraida de la app de Yelp
const apiKey = 'CvdHubOjDW_mYkjC20SKtp1RiIvR2ys2y0ChRRdybj2eCbteFkfcpVi6QP7ymjbijYKrm3ccWIUwP_0jQu9QSymf6y2axK6WsFXwxf9UDwfPU2H49i8jkp7jdUKyYXYx';

// Objeto que tiene la funcionalidad para para interactuar con la API
const Yelp = {
    // Este metodo sirve para traer los resultados de las busquedas hechas por la API
    search: function(term, location, sortBy) {
        //Agrego la parte de 'https://cors../' para poder usar la API (si no, CORS pone restricciones)
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
                     { headers: {Authorization: `Bearer ${apiKey}`} }
        /* El segundo parametro, el objeto de con llave 'headers', lo incluyo ya que
        al hacer el request a la API, necesito una identficacion para el browser, 
        que indique que estoy autorizado a usar la API. Esto se hace incluyendo la API
        como header del browser.*/ 
                    ).then(response => { // Lo convierto en .json para poder utilizar mi lista de businesses
                        return response.json();
                    }).then(jsonResponse => {   // Agrego otro .then para pasar de json a objeto
                        if (jsonResponse.businesses) {  // Si existe la key 'businesses'
                            return jsonResponse.businesses.map(business => {
                                return {
                                    //Completo la data basandome en el siguiente link de Yelp
                                    //https://www.yelp.com/developers/documentation/v3/business
                                    id: business.id,
                                    imageSrc: business.image_url,
                                    name: business.name,
                                    address: business.location.address1,
                                    city: business.location.city,
                                    state: business.location.state,
                                    zipCode: business.location.zip_code,
                                    category: business.categories[0].title,
                                    rating:business.rating, 
                                    reviewCount: business.review_count
                                };
                            });
                        }

                    });

    }
};

export default Yelp;