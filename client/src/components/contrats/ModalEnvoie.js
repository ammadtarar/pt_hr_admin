import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

class ModalEnvoie extends React.Component {
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
          <textarea placeholder={defaultMessage} name="message" form="send-form" />
          <hr/>
          <input className="btn align-right" id="submit" type="submit"/>
          <button className="btn-fifth align-right" onClick={this.closeModal}>Annuler</button>
        </form>
      </div>
    );
  }
}

export default ModalEnvoie;
