import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import AutosizeInput from 'react-input-autosize';

export class PackageLine extends React.Component {

  handleChangeTextArea = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangePrestataire = (e) => {
    this.setState({
      prestataire: {
        [e.target.name]: e.target.value
      }
    });
  }

  handleChangeClient = (e) => {
    this.setState({
      client: {
        [e.target.name]: e.target.value
      }
    });
  }
  
  render() {
    return (
      <div>
        <h3>New option</h3>
        <p className="m-size lynch">Lorem ipsum dolor sit amet, ea eum solum pertinax evertitur, vocent saperet denique eu vim, adhuc nullam doming ut sed. Posidonium argumentum ut nec, usu et ubique oblique suavitate.</p>
        <div className="row-fluid container-item">
          <div className="large-7 columns">
            <p className="eastern-blue">Description</p>
            <input
              style={{maxHeight: 300}}
              name="description"
              className="first-item"
              value="Webdesign et recherche branding"
              onChange={this.handleChangeTextArea}
            />
          </div>
          <div className="large-2 columns">
            <p className="eastern-blue">Tarif horaire</p>
            <p><AutosizeInput
              name="prestaire-tauxhoraire"
              value={this.state.prestataire.tauxhoraire}
              onChange={this.handleChange}
              />€/heure</p>
          </div>
          <div className="large-1 columns">
            <p className="eastern-blue">Quantité</p>
            <AutosizeInput
              name="prestaire-tauxhoraire"
              value="4"
              onChange={this.handleChange}
              />
          </div>
          <div className="large-1 columns">
            <p className="eastern-blue">Total</p>
            <p><AutosizeInput
              name="prestaire-tauxhoraire"
              value="4000"
              onChange={this.handleChange}
              />€</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PackageLine;
