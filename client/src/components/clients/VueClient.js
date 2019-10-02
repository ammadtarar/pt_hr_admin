import React from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import database from '../../firebase/firebase';
import CheckBox from '../modules/CheckBox';
import ProgressBarPaiement from './ProgressBarPaiement';
import Aside from '../Aside';

export class VueClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      factures: [],
      impayésTotal: ''
    }
  }

  //Toutes les factures
  callFactures() {
    var currentYear = new Date().getFullYear();
    database.ref('abonnement/factures').orderByChild('date').startAt(currentYear).on('value', (snapshot) => {
      const factures = snapshot.val();
      const newState = [];

      for (let item in factures) {
        //Formatage date d'émission
        const dateEmission = new Date(factures[item].date);
        var mm = dateEmission.getMonth() + 1;
        var dateEmissionFormat = dateEmission.getDate() + '-' + mm;

        //Calcul nombre de jours avant date paiement dù
        var date1 = new Date(factures[item].date);
        var date2 = new Date();
        var tempsDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffJours = Math.ceil(tempsDiff / (1000 * 3600 * 24));

        newState.push({
          numero: item,
          date: dateEmission,
          entreprise: factures[item].entreprise,
          delaiPaiement: factures[item].delaiPaiement,
          JoursRestantsPaiement: diffJours,
          status: factures[item].status,
          titre: factures[item].titre,
          montant: factures[item].montant
        });
      }
      this.setState({
        factures: newState
      });
    });
  }

  //Impayés
  callImpayes() {
  }

  componentDidMount() {
    this.callFactures()
    this.callImpayes()
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="client-vue">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-5 columns">
                  <Link to="/clients"><p className="retour">Clients</p></Link>
                  <h1>Dolead</h1>
                </div>
              </div>
            </section>

            <section className="section-2 container transparent">
              <div className="container shadows">
                <div className="row-fluid">
                  <div className="large-2 columns">
                    <img type="image/svg+xml" className="logo" src="/images/logo-publicis.png" alt=""/>
                  </div>
                  <div className="large-4 columns">
                    <h2>Publicis</h2>
                    <p className="m-size">Publicis Groupe, 133 Av. des Champs-Élysées, 75008 Paris</p>
                  </div>
                  <div className="box-ca-total">
                    <h3 className="cornflower-blue">7500€</h3>
                    <p className="lynch">Chiffre d'affaire</p>
                    <h4 className="tarawera">2400€</h4>
                    <p className="lynch">En attente de paiement</p>
                    <h4 className="tarawera">{this.state.impayés}</h4>
                    <p className="lynch">Impayés</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-3 container transparent">
              <h2>Conditions de paiement</h2>
              <div className="container shadows">
                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Paiement</label>
                  </div>
                  <div className="large-2 columns">
                    <button className="align-right btn-third">Comptant</button>
                  </div>
                  <div className="large-2 columns">
                    <button className="align-right btn-third">+10 jours</button>
                  </div>
                  <div className="large-2 columns">
                    <button className="align-right">+20 jours</button>
                  </div>
                  <div className="large-2 columns">
                    <button className="align-right btn-third">+30 jours</button>
                  </div>
                  <div className="large-2 columns">
                    <button className="align-right btn-third">Autre</button>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Prestation par défaut</label>
                  </div>
                  <div className="large-2 columns">
                    <button className="align-right">Heure</button>
                  </div>
                  <div className="large-2 columns">
                    <button className="align-right btn-third">Jour</button>
                  </div>
                  <div className="large-2 columns">
                    <button className="align-right btn-third">Forfait</button>
                  </div>
                  <div className="large-2 columns"></div>
                  <div className="large-2 columns"></div>
                </div>
              </div>
            </section>

            <section className="section-4 container transparent">
              <h2>Notes</h2>
              <div className="container shadows">
                <p><TextareaAutosize
                  useCacheForDOMMeasurements
                  name="notes"
                  value="Inscrivez-vous ici des note sur votre client, votre relation, ou par exemple gardez ici vos témoignes clients."
                /></p>
              </div>
            </section>

            <section className="section-6 container transparent table" id="tableau-factures">
              <h2>Historique facturation</h2>
              <ul className="year">
                <li className="current">2019</li>
                <li>2018</li>
                <li>2017</li>
                <li>2016</li>
              </ul>
              <div className="row_table header">
                <div className="cell"><CheckBox /></div>
                <div className="cell">Client</div>
                <div className="cell">Description</div>
                <div className="cell">Émis le</div>
                <div className="cell">Réglement</div>
                <div className="cell">Montant</div>
              </div>

              {this.state.factures.map((item) => {
                let statusBar;

                if ((item.status === 'impayée') || (item.status === 'envoyée')) {
                  statusBar = <ProgressBarPaiement status={item.status} joursRestantsPaiement={item.JoursRestantsPaiement} delaiPaiement={item.delaiPaiement}/>
                } else if (item.status === 'brouillon') {
                  statusBar = <h5 className={item.status}>{item.status}</h5>
                } else if (item.status === 'payée') {
                  statusBar = <h5 className={item.status}>Virement bancaire</h5>
                }
                return (
                  <Link to={{pathname: "/factures/vue", numero: item.numero}} key={item.numero}>
                    <div className="row_table shadows">
                      <div className="cell"><CheckBox /></div>
                      <div className="cell">{item.entreprise}<br/><span>{item.numero}</span></div>
                      <div className="cell">{item.titre}</div>
                      <div className="cell">{item.date}</div>
                      <div className="cell">{statusBar}</div>
                      <div className="cell">{item.montant}€</div>
                    </div>
                  </Link>
                )
              })}
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default VueClient;
