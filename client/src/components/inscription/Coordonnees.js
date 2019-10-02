import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import database from '../../firebase/firebase';
import Aside from './aside/AsideCoordonnees';
import Avancement from './Avancement';

export class Coordonnees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientKey: props.clientKey,
      rue: '',
      rueComplement: '',
      ville: '',
      pays: '',
      telephone: ''
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
      rue: self.state.rue,
      rueComplement: self.state.rueComplement,
      ville: self.state.ville,
      pays: self.state.pays,
      telephone: self.state.telephone
    });
    self.props.history.push({
      pathname: '/inscription/entreprise'
    });
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper initialisation">
          <main className="initialisation coordonnees">
            <section className="section-1 transparent">
              <Avancement/>
            </section>

            <section className="section-2 transparent">
              <div className="container shadows">
                <div className="box-popup">
                  <h1>Adresse de ton entreprise</h1>
                  <form onSubmit={this.onSubmit}>
                    <label>Adresse</label>
                    <input
                      type="text"
                      name="rue"
                      className="full-width"
                      value={this.state.rue}
                      onChange={(event) => this.handleUserInput(event)}
                      placeholder="Rue"
                      />
                    <input
                      type="text"
                      name="rueComplement"
                      className="full-width"
                      value={this.state.rueComplement}
                      onChange={(event) => this.handleUserInput(event)}
                      placeholder="Complément d'adresse"
                      />
                    <div className="row-fluid">
                      <div className="large-6 columns">
                        <input
                          type="text"
                          name="codePostale"
                          className="full-width"
                          value={this.state.codePostale}
                          onChange={(event) => this.handleUserInput(event)}
                          placeholder="Code postale"
                          />
                      </div>
                      <div className="large-6 columns">
                        <input
                          type="text"
                          name="ville"
                          className="full-width"
                          value={this.state.ville}
                          onChange={(event) => this.handleUserInput(event)}
                          placeholder="Ville"
                          />
                      </div>
                    </div>
                    <div className="row-fluid">
                      <div className="large-12 columns">
                        <input
                          type="text"
                          className="half-width"
                          name="pays"
                          value={this.state.pays}
                          onChange={(event) => this.handleUserInput(event)}
                          placeholder="Pays"
                          />
                      </div>
                    </div>
                    <label>Téléphone mobile</label>
                    <input
                      type="text"
                      className="full-width"
                      name="telephone"
                      value={this.state.telephone}
                      onChange={(event) => this.handleUserInput(event)}
                      placeholder="06 78 34 12 08"
                      />
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

export default connect(mapStateToProps, undefined)(Coordonnees);
