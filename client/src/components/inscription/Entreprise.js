import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import database from '../../firebase/firebase';
import Aside from './aside/AsideEntreprise';
import Avancement from './Avancement';

export class InscriptionEntreprise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientKey: props.clientKey,
      raisonSociale: '',
      formeJuridique: '',
      periodiciteDeclarationCA: ''
    }
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    var self = this;
    database.ref(`clients/${this.state.clientKey}`).update({
      raisonSociale: self.state.raisonSociale,
      formeJuridique: self.state.formeJuridique,
      periodiciteDeclarationCA: self.state.periodiciteDeclarationCA
    });
    self.props.history.push({
      pathname: '/inscription/configuration-documents'
    });
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper initialisation">
          <main className="initialisation entreprise">
            <section className="section-1 transparent">
              <Avancement/>
            </section>

            <section className="section-2 transparent">
              <div className="container shadows">
                <div className="box-popup">
                  <h1>Ton entreprise</h1>
                  <h4>Informations légales</h4>
                  <form onSubmit={this.onSubmit}>
                    <label>Raison sociale</label>
                    <input
                      type="text"
                      className="full-width"
                      name="raisonSociale"
                      value={this.state.raisonSociale}
                      onChange={(event) => this.handleUserInput(event)}
                      placeholder="Raison sociale"
                      />
                    <label>Forme juridique</label>
                    <select
                      id="custom-select"
                      name="formeJuridique"
                      onChange={(event) => this.handleUserInput(event)}>
                      <option value="" defaultValue>Selectionnes sa forme juridique</option>
                      <option value="Auto-entrepreneur">Auto-entrepreneur</option>
                      <option value="Maison des artistes">Maison des artistes</option>
                      <option value="EURL/EIRL">EURL/EIRL</option>
                      <option value="SASU/SAS">SASU/SAS</option>
                      <option value="AGESSA">AGESSA</option>
                      <option value="SARL">SARL</option>
                      <option value="Autre">Autre</option>
                    </select>
                    <label>Périodicité déclaration du chiffre d'affaire</label>
                    <select
                      id="custom-select"
                      name="periodiciteDeclarationCA"
                      onChange={(event) => this.handleUserInput(event)}>
                      >
                      <option value="" defaultValue>Selectionnes ta périodicité de cotisations</option>
                      <option value="Mensuellement">Mensuelle</option>
                      <option value="Trimestriellement">Trimestrielle</option>
                    </select>
                    <Link to="/inscription/coordonnees"><button className="btn-third align-left">Retour</button></Link>
                    <button type="submit" className="btn align-right">Suivant</button>
                  </form>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({signup: {clientKey}}) => ({
  clientKey
});

export default connect(mapStateToProps, undefined)(InscriptionEntreprise);
