// Aca va el segundo componente

import React from 'react';
import Business from '../Business/Business'; // Importo el primer componente
import './BusinessList.css';

// Creo el componente
class BusinessList extends React.Component {
    //Metodo de render
    render() {
        return (
            // Lista de negocios de la pagina
            <div class="BusinessList">
              {
                this.props.businesses.map(business => { /*Aca iban los business repetidos */
                  return <Business business={business} key={business.id}/>;
                })
              }
            </div>
        );
    };
};

// Exporto el componente
export default BusinessList;