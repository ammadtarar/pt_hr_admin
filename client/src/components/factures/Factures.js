import React from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../modules/CheckBox';
import ProgressBarPaiement from './ProgressBarPaiement';
import Aside from '../Aside';

export class Factures extends React.Component {
  constructor() {
    super();
    this.state = {
      factures: [],
      impayés: []
    }
  }

  componentDidMount() {
    fetch('/factures-infos')
      .then(res => res.json())
      .then(res => this.callFactures(res))
    fetch('/impayees')
      .then(res => res.json())
      .then(res => this.callImpayees(res))
  }

  //Toutes les factures
  callFactures(res) {
    const newState = [];
    for (let item in res) {
      //Formatage date d'émission
      const dateEmission = new Date(res[item].date);
      var mm = dateEmission.getMonth() + 1;
      // var dateEmissionFormat = dateEmission.getDate() + '-' + mm;

      //Formatage data
      const date = new Date(res[item].date);
      date.setDate(date.getDate());
      const mois = [
        "jan", "fév", "mars",
        "avr", "mai", "juin", "juil",
        "août", "sept", "oct",
        "nov", "déc"
      ];
      const dateReformat = date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear();

      //Calcul nombre de jours avant date paiement dù
      var date1 = new Date(res[item].date);
      var date2 = new Date();
      var tempsDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffJours = Math.ceil(tempsDiff / (1000 * 3600 * 24));

      newState.push({
        numero: item,
        date: dateReformat,
        entreprise: res[item].entreprise,
        delaiPaiement: res[item].delaiPaiement,
        JoursRestantsPaiement: diffJours,
        status: res[item].status,
        titre: res[item].titre,
        montant: res[item].montant
      });
    }
    this.setState({
      factures: newState
    });
  }

  //Impayés
  callImpayees(res) {
    const newState = [];
    var data = [];
    var total = 0;

    for (let item in res) {
      newState.push({
        montant: res[item].montant
      });
    }
    for (var i = 0; i < newState.length; i++) {
      total += newState[i].montant
    }
    this.setState({
      impayésTotal: total
    });
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="factures">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h1>Factures</h1>
                </div>
                <div className="large-6 columns">
                  <Link to="/edit-facture"><button className="align-right">Créer une facture</button></Link>
                </div>
              </div>
            </section>

            <section className="section-2 container container-synthese shadows">
              <div className="row-fluid">
                <div className="large-5 columns box-synthese">
                  <h3 className="radical-red">{this.state.impayésTotal ? this.state.impayésTotal : '0'}€</h3>
                  <p className="lynch text-left">En retard de paiement</p>
                </div>
                <div className="large-3 columns text-left box-synthese">
                  <h3 className="cornflower-blue">1500€</h3>
                  <p className="text-left lynch">Encaissements à venir</p>
                </div>
                <div className="large-4 columns box-synthese">
                  <h3 className="text-right">47 jours</h3>
                  <p className="text-right lynch">Temps moyen pour être payé</p>
                </div>
                <p className="rafraichir">Dernière mise à jour il y a un moment. <strong>Rafraichir</strong></p>
              </div>
              <div className="row-fluid">
                <div className="large-3 text-right columns">
                  <img type="image/svg+xml" className="icon-credit-card" src="/images/cc-visa.svg" alt=""/>
                  <img type="image/svg+xml" className="icon-credit-card" src="/images/cc-mastercard.svg" alt=""/>
                  <img type="image/svg+xml" className="icon-credit-card" src="/images/cc-amex.svg" alt="" />
                </div>
                <div className="large-9 columns">
                  <p className="eastern-blue">Les factures sont payés 3x plus rapidement avec les paiements en ligne. <Link to="/integrations"><strong> Activez les Paiements</strong></Link></p>
                </div>
              </div>
            </section>

            <section className="section-3 container transparent table" id="tableau-factures">
              <h2>Toutes les factures</h2>
              <ul className="year">
                <li className="current">2019</li>
                <li>2018</li>
                <li>2017</li>
                <li>2016</li>
              </ul>
              <div className="row_table header">
                <div className="cell"><CheckBox /></div>
                <div className="cell">Émis le</div>
                <div className="cell">Client</div>
                <div className="cell">Description</div>
                <div className="cell">Réglement</div>
                <div className="cell">Montant</div>
              </div>

              {this.state.factures.reverse().map((item) => {
                let statusBar;

                if ((item.status === 'Impayée') || (item.status === 'Envoyée')) {
                  statusBar = <ProgressBarPaiement status={item.status} joursRestantsPaiement={item.JoursRestantsPaiement} delaiPaiement={item.delaiPaiement}/>
                } else if (item.status === 'Brouillon') {
                  statusBar = <h5 className={item.status}>{item.status}</h5>
                } else if (item.status === 'Payée') {
                  statusBar = <h5 className={item.status}>Virement bancaire</h5>
                }
                return (
                  <Link to={{pathname: "/factures/vue", numero: item.numero}} key={item.numero}>
                    <div className="row_table shadows">
                      <div className="cell"><CheckBox /></div>
                      <div className="cell">{item.date}</div>
                      <div className="cell">{item.entreprise}<br/><span>{item.numero}</span></div>
                      <div className="cell">{item.titre}</div>
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

export default Factures;
