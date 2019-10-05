import React from 'react'
import Aside from '../Aside'
import { Link } from 'react-router-dom'
import socketIOClient from 'socket.io-client'

export class SyncBanque extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comptes: [],
      selectedCompteID: '',
      selectedCompteCBID: ''
    }
  }

  callComptes(res) {
    fetch('http://localhost:8081/comptes')
      .then(res => res.json())
      .then(res => {
        const comptes = [];
        for (let item in res.data.resources) {
          comptes.push({
            id: res.data.resources[item].id,
            montant: res.data.resources[item].balance,
            currency_code: res.data.resources[item].currency_code,
            name: res.data.resources[item].name,
            type: res.data.resources[item].type
          });
        }
        this.setState({
          comptes: comptes
        });
      })
      .catch(err => err);
  }

  selectAccount(id) {
    this.setState({
      selectedCompteID: id
    });
  }

  selectAccountCB(id) {
    this.setState({
      selectedCompteCBID: id
    });
  }

  confirmation(e) {
    const socket = socketIOClient('localhost:8081/')
    socket.emit('choix comptes', {compteID: this.state.selectedCompteID, compteCBID: this.state.selectedCompteCBID})
    this.props.history.push({
      pathname: '/banque'
    })
  }

  componentWillMount() {
    fetch('http://localhost:8081/comptes')
      .then(res => res.json())
      .then(res => this.callComptes(res))
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="banque-synchronisation">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-12 columns">
                  <h1>Synchronisation bancaire</h1>
                  <br/>
                  <p>Sélectionnez le(s) compte(s) à lier à votre trésorerie</p>
                </div>
              </div>

              <div id="tableau-comptes">
                {this.state.comptes.map((item) => {
                  if (item.type !== 'card') {
                    return (
                      <div
                      onClick={() => this.selectAccount(item.id)}
                      className={`row_table shadows ${this.state.selectedCompteID === item.id ? 'checked' : ''}`}
                      key={item.name}>
                        <div className="cell">{item.name}</div>
                        <div className={`cell ${Math.sign(item.montant) === 1 ? 'credit' : Math.sign(item.montant) === -1 ? 'debit' : ''}`}>{item.montant} {item.currency_code === 'EUR' ? '€' : ''}</div>
                      </div>
                    )
                  }
                })}
              </div>
            </section>

            <section className="section-2 container transparent">
              <div className="row-fluid">
                <div className="large-12 columns">
                  <p>Sélectionnez la carte bancaire à lier à votre trésorerie</p>
                </div>
              </div>

              <div id="tableau-comptes">
                {this.state.comptes.map((item) => {
                  if (item.type === 'card') {
                    return (
                      <div
                      onClick={() => this.selectAccountCB(item.id)}
                      className={`row_table shadows ${this.state.selectedCompteCBID === item.id ? 'checked' : ''}`}
                      key={item.name}>
                        <div className="cell">{item.name}</div>
                        <div className={`cell ${Math.sign(item.montant) === 1 ? 'credit' : Math.sign(item.montant) === -1 ? 'debit' : ''}`}>{item.montant} {item.currency_code === 'EUR' ? '€' : ''}</div>
                      </div>
                    )
                  }
                })}
              </div>
            </section>

            <section className="section-3 container transparent">
              <Link to="/banque"><button className="btn-fifth">Retour</button></Link>
              <button onClick={(e) => this.confirmation(e)}>Confirmer</button>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default SyncBanque;
