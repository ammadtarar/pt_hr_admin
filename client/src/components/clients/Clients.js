import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import CheckBox from '../modules/CheckBox';
import database from '../../firebase/firebase';
import Aside from '../Aside';

export class Clients extends React.Component {
  constructor() {
    super();
    this.state = {
      clients: []
    }
  }

  componentDidMount() {
    database.ref('abonnement/factures').orderByChild('entreprise').on('value', (snapshot) => {
      const clients = snapshot.val();
      const newState = [];
      for (let item in clients) {
        newState.push({
          client: clients[item].entreprise
        });


        database.ref('abonnement/factures').orderByChild('entreprise').startAt(clients[item].entreprise).endAt(clients[item].entreprise).on('value', (snapshot) => {
          const val = snapshot.val();
          if (snapshot.exists()){
            const newState = [];
            var data = [];
            var total = 0;

            for (let item in val) {
              newState.push({
                montant: val[item].montant
              });
            }
            for (var i = 0; i < newState.length; i++) {
              total += newState[i].montant
            }
          }
        });


      }
      this.setState({
        clients: newState
      });
    });
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="clients">
            <section className="container transparent">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h1>Clients</h1>
                </div>
                <div className="large-6 columns">
                  <button className="align-right">Ajouter un client</button>
                </div>
              </div>
            </section>

            <section className="container transparent table" id="tableau-clients">
              <div className="row_table header">
                <div className="cell"><CheckBox /></div>
                <div className="cell">Client</div>
                <div className="cell">Total chiffre d'affaire</div>
              </div>

              {this.state.clients.map((item) => {
                  return (
                    <Link to={{pathname: "/clients/vue", client: item.client}} key={item.client}>
                      <div className="row_table shadows">
                        <div className="cell"><CheckBox /></div>
                        <div className="cell"><div></div><p>{item.client}</p></div>
                        <div className="cell">3400 €</div>
                      </div>
                    </Link>
                  )
                }
              )}

            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default Clients;
