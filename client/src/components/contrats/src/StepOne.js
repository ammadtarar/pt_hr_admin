import React from 'react';

export class StepOne extends React.Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: ''
    }
    this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
    this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
  }

  handleFirstNameChanged (event) {
    this.setState({firstName: event.target.value})
  }

  handleLastNameChanged (event) {
    this.setState({lastName: event.target.value})
  }

  render () {
    return (
      <section className="container transparent step1">
        <div className="row-fluid">
          <div className="close">X</div>
          <div className="large-10 columns">
            <h1>Création d'un nouveau contrat</h1>
            <p>Remplissez les informations de base</p>
          </div>
          <div className="large-2 columns">
            <p className="align-right l-size">1 / 4</p>
          </div>
        </div>
        <hr/>
        <div className="row-fluid">
          <div className="large-8 columns">
            <h3>
              Je suis un <span className="editable">freelance</span> et j’habite à <span className="editable">Bali</span>.<br/>
              Je travaille à travers une entreprise (exemple : ACME entreprise)<br/>
              Le status de mon entreprise est une <span className="editable">SASU</span>, une <span className="editable">entreprise à responsabilité limitée</span><br/>
              Mon titre dans l’entreprise est <span className="editable">Développeur front-end et gérant</span><br/>
              Mon client est une <span className="editable">entreprise</span> nommée <span className="editable">nom de l’entreprise</span>
            </h3>
          </div>
          <div className="large-4 columns">
            <p className="info">Sélectionnez votre emplacement en cliquant sur le texte en gras. Chaque pays et chaque État a des lois différentes concernant le travail.</p>
          </div>
        </div>
        <hr/>
      </section>
    );
  }
}

export default StepOne;
