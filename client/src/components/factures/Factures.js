import React from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../modules/CheckBox';
import ProgressBarPaiement from './ProgressBarPaiement';
import Aside from '../Aside';

export class Factures extends React.Component {
  constructor() {
    super();
    this.state = {
      order: '',
      currentPage: 1,
      todosPerPage: 9,
      factures: [],
      impayés: []
    }
  }

  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(res => {var factures = res.factures; this.callFactures(factures)})
    fetch('/impayees')
      .then(res => res.json())
      .then(res => this.callImpayees(res))
  }

  preventDragHandler = (e) => {
    e.preventDefault();
  }

  //Toutes les factures
  callFactures(factures) {
    this.setState({
      'factures': factures
    });
  }

  //Impayés
  callImpayees(factures) {
    const newState = [];
    var data = [];
    var total = 0;

    for (let item in factures) {
      newState.push({
        montant: factures[item].montant
      });
    }
    for (var i = 0; i < newState.length; i++) {
      total += newState[i].montant
    }
    this.setState({
      impayésTotal: total
    });
  }

  onSortChange(e) {
    e.persist()
    const factures = this.state.factures;
    if (factures) {
      const order = this.state.order
      const sorted = Object.values(factures).sort(function(a, b) {
          return a[order] > b[order] ? 1 : (a[order] < b[order] ? -1 : 0)
      })
      const sortedDate = Object.values(factures).sort(function(a, b) {
          return new Date(a.date) > new Date(b.date) ? 1 : (new Date(a.date) < new Date(b.date) ? -1 : 0)
      })
      if(order === 'date') {
        this.setState({
          'factures': this.state.previousOrder === order ? Object.values(factures).sort(function(a, b) {
              return new Date(a.date) < new Date(b.date) ? 1 : (new Date(a.date) > new Date(b.date) ? -1 : 0)
          }) : sortedDate
        });
      } else {
        this.setState({
          'factures': this.state.previousOrder === order ? Object.values(factures).sort(function(a, b) {
              return a[order] < b[order] ? 1 : (a[order] > b[order] ? -1 : 0)
          }) : sorted
        });
      }
      this.state.previousOrder === order ? this.setState({previousOrder: ''}) : this.setState({previousOrder: order})
    }
  }

  render() {
    const factures = this.state.factures

    return (
      <div>
        <Aside/>
        <div className="wrapper" onDragStart={this.preventDragHandler}>
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
                <div className="cell order"><span onClick={(e) => this.setState({order: 'date'}, () => {this.onSortChange(e)})} className={this.state.order === 'date' ? 'checked' : ''}>Émis le</span></div>
                <div className="cell order"><span onClick={(e) => this.setState({order: 'entreprise'}, () => {this.onSortChange(e)})} className={this.state.order === 'entreprise' ? 'checked' : ''}>Client</span></div>
                <div className="cell order"><span onClick={(e) => this.setState({order: 'titre'}, () => {this.onSortChange(e)})} className={this.state.order === 'titre' ? 'checked' : ''}>Description</span></div>
                <div className="cell order"><span onClick={(e) => this.setState({order: 'reglement'}, () => {this.onSortChange(e)})} className={this.state.order === 'reglement' ? 'checked' : ''}>Réglement</span></div>
                <div className="cell order"><span onClick={(e) => this.setState({order: 'montant'}, () => {this.onSortChange(e)})} className={this.state.order === 'montant' ? 'checked' : ''}>Montant</span></div>
              </div>

              {Object.keys(factures).map((key, item, i) => {
                let statusBar;

                //Formatage date d'émission
                const dateEmission = new Date(factures[key].date);
                var mm = dateEmission.getMonth() + 1;

                //Formatage data
                const date = new Date(factures[key].date);
                date.setDate(date.getDate());
                const mois = [
                  "jan", "fév", "mars",
                  "avr", "mai", "juin", "juil",
                  "août", "sept", "oct",
                  "nov", "déc"
                ];
                const dateReformat = date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear();

                //Calcul nombre de jours avant date paiement dù
                var date1 = new Date(factures[key].date);
                var date2 = new Date();
                var tempsDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffJours = Math.ceil(tempsDiff / (1000 * 3600 * 24));

                if ((factures[key].status === 'Impayée') || (factures[key].status === 'Envoyée')) {
                  statusBar = <ProgressBarPaiement status={factures[key].status} joursRestantsPaiement={factures[key].JoursRestantsPaiement} delaiPaiement={factures[key].delaiPaiement}/>
                } else if (factures[key].status === 'Brouillon') {
                  statusBar = <h5 className={factures[key].status}>{factures[key].status}</h5>
                } else if (factures[key].status === 'Payée') {
                  statusBar = <h5 className={factures[key].status}>{factures[key].reglement}</h5>
                }
                return (
                  <Link to={{pathname: "/factures/vue", numero: factures[key].numero}} key={factures[key].numero}>
                    <div className="row_table shadows">
                      <div className="cell"><CheckBox /></div>
                      <div className="cell">{dateReformat}</div>
                      <div className="cell">{factures[key].entreprise}<br/><span>{factures[key].numero}</span></div>
                      <div className="cell">{factures[key].titre}</div>
                      <div className="cell">{statusBar}</div>
                      <div className="cell">{factures[key].montant}€</div>
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
