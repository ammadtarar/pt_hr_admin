import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

class ModalCreerContrat extends React.Component {
  render() {
    <ModalCreerContrat
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      contentLabel="Example Modal"
      class="modal"
    >

      <div className="row-fluid">
        <div className="large-11 columns">
          <h2 className="text-left">Création d'un nouveau contrat</h2>
          <p>Remplissez les informations de base</p>
        </div>
        <div className="large-1 columns">
          <p className="align-right l-size">1/4</p>
        </div>
      </div>
      <hr/>
      <p>
        Je suis un <span className="editable">freelance</span> et j’habite à <span className="editable">Bali</span>.<br/>
        Je travaille à travers une entreprise (exemple : ACME entreprise)<br/>
        Le status de mon entreprise est une <span className="editable">SASU</span>, une <span className="editable">entreprise à responsabilité limitée</span><br/>
        Mon titre dans l’entreprise est <span className="editable">Développeur front-end et gérant</span><br/>
        Mon client est une <span className="editable">entreprise</span> nommée <span className="editable">Nom de l’entreprise</span>
      </p>
      <hr/>
      <button className="align-right" onClick={this.closeModal}>Continuer</button>
      <button className="btn-fifth align-right" onClick={this.closeModal}>Annuler</button>
    </ModalCreerContrat>
    );
  }
}

export default ModalCreerContrat;
