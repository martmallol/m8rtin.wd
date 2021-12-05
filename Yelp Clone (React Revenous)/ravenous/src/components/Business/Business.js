// Aca va el primer componente

// Importo React
import React from "react";
import './Business.css' // Importo el diseno de <Business />

// Creo el objeto 'business'
// El componente '<Business /> de react va a consumir su info
const business = {
    imageSrc: 'https://content.codecademy.com/programs/react/ravenous/pizza.jpg',
    name: 'MarginOtto Pizzeria',
    address: '1010 Paddington Way',
    city: 'Flavortown',
    state: 'NY',
    zipCode: '10101',
    category: 'Italian',
    rating: 4.5,
    reviewCount: 90
};

// Creo el componente
class Business extends React.Component {
    // Metodo de render
    render() {
        // Info linkeada a las propiedades del objeto 'business'
        return (
            <div className="Business">
              <div className="image-container">
                <img src={business.imageSrc} alt=''/>
              </div>
              <h2>{business.name}</h2>
              <div className="Business-information">
                <div className="Business-address">
                  <p>{business.address}</p>
                  <p>{business.city}</p>
                  <p>{business.state} {business.zipCode}</p>
                </div>
                <div className="Business-reviews">
                  <h3>{business.category}</h3>
                  <h3 className="rating">{business.rating} stars</h3>
                  <p>{business.reviewCount} reviews</p>
                </div>
              </div>
            </div>
        );
    };
};

export default Business; // Hago al componente exportable