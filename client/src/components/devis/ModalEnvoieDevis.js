import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ModalEnvoie extends React.Component {
  envoieDevis (e) {
    e.preventDefault();
    axios({
      method: 'GET',
      crossDomain: true,
      url: 'http://localhost:3000/mailchimp/envoie-devis.php',
      data: {
        email_address: 'jules84v@hotmail.fr'
      },
      json: true
    })
    .then((data) => {
      console.log(data);
      console.log('Devis envoyé');
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Envoyer le contrat pour signature</h2>
        <hr/>
        <form id="send-contrat-form">
          <div className="row-fluid">
            <div className="large-2 columns"><p>À:</p></div>
            <div className="large-10 columns"><input placeholder="contact@julienlucas.com" type="email" id="email"/></div>
          </div>
          <div className="row-fluid">
            <div className="large-2 columns"><p>Sujet:</p></div>
            <div className="large-10 columns"><input placeholder="Julien vous a envoyé un devis" type="text" id="sujet"/></div>
          </div>
          <label>MESSAGE</label>
          <textarea placeholder="megatop" name="message" form="send-form" />
          <hr/>
          <input onClick={this.envoieDevis} className="btn align-right" id="submit" type="submit"/>
          <button onClick={this.closeModal} className="btn-fifth align-right">Annuler</button>
        </form>
      </div>
    );
  }
}

export default ModalEnvoie;
