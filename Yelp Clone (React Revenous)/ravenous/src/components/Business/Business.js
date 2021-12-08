// Aca va el primer componente

// Importo React
import React from "react";
import './Business.css' // Importo el diseno de <Business />

// Aca iba el objeto 'business'

// Creo el componente
class Business extends React.Component {
    // Metodo de render
    render() {
        // Info linkeada a las propiedades del objeto 'business'
        return (
            <div className="Business">
              <div className="image-container">
                <img src={this.props.imageSrc} alt=''/>
              </div>
              <h2>{this.props.name}</h2>
              <div className="Business-information">
                <div className="Business-address">
                  <p>{this.props.address}</p>
                  <p>{this.props.city}</p>
                  <p>{this.props.state} {this.props.zipCode}</p>
                </div>
                <div className="Business-reviews">
                  <h3>{this.props.category}</h3>
                  <h3 className="rating">{this.props.rating} stars</h3>
                  <p>{this.props.reviewCount} reviews</p>
                </div>
              </div>
            </div>
        );
    };
};

export default Business; // Hago al componente exportable