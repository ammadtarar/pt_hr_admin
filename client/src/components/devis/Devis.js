import React from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../modules/CheckBox';
import Aside from '../Aside';

export class DevisPropositions extends React.Component {
  constructor() {
    super();
    this.state = {
      devis: []
    }
  }

  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(res => {var devis = res.devis; this.callDevis(devis)})
  }

  callDevis(devis) {
    this.setState({
      'devis': devis
    })
  }

  preventDragHandler = (e) => {
    e.preventDefault();
  }

  years() {
    let years = [];
    const date = new Date();
    for (var i = 0; i < 5; i++) {
      const year = date.getFullYear()-i;
      years.push(<li onClick={(e) => this.setState({'year': year}, () => {this.onSortYear(e)})} className={this.state.year === year ? 'current' : ''}>{year}</li>);
    }
    return <ul className="year">{years}</ul>
  }

  onSortChange(e) {
    e.persist()
    const devis = this.state.devis;
    if (devis) {
      const order = this.state.order
      const sorted = Object.values(devis).sort(function(a, b) {
          return a[order] > b[order] ? 1 : (a[order] < b[order] ? -1 : 0)
      })
      const sortedDate = Object.values(devis).sort(function(a, b) {
          return new Date(a.date) > new Date(b.date) ? 1 : (new Date(a.date) < new Date(b.date) ? -1 : 0)
      })
      if(order === 'date') {
        this.setState({
          'devis': this.state.previousOrder === order ? Object.values(devis).sort(function(a, b) {
              return new Date(a.date) < new Date(b.date) ? 1 : (new Date(a.date) > new Date(b.date) ? -1 : 0)
          }) : sortedDate
        });
      } else {
        this.setState({
          'devis': this.state.previousOrder === order ? Object.values(devis).sort(function(a, b) {
              return a[order] < b[order] ? 1 : (a[order] > b[order] ? -1 : 0)
          }) : sorted
        });
      }
      this.state.previousOrder === order ? this.setState({previousOrder: ''}) : this.setState({previousOrder: order})
    }
  }

  render() {
    const devis = this.state.devis;

    return (
      <div>
        <Aside/>
        <div className="wrapper" onDragStart={this.preventDragHandler}>
          <main className="devis">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-5 columns">
                  <h1>Devis et propositions commerciales</h1>
                  {this.years()}
                </div>
                <div className="large-7 columns">
                  <Link to="/devis/creer"><button className="align-right">Créer un devis</button></Link>
                  <Link to="/devis/edit-proposition"><button className="align-right">Créer une proposition commerciale</button></Link>
                </div>
              </div>
            </section>

            <section className="container transparent table" id="tableau-devis">
              <div className="row_table header">
                <div className="cell"><CheckBox /></div>
                <div className="cell"><span onClick={(e) => this.setState({order: 'date'}, () => {this.onSortChange(e)})} className={this.state.order === 'date' ? 'checked' : ''}>Date</span></div>
                <div className="cell"><span onClick={(e) => this.setState({order: 'entreprise'}, () => {this.onSortChange(e)})} className={this.state.order === 'entreprise' ? 'checked' : ''}>Client</span></div>
                <div className="cell"><span onClick={(e) => this.setState({order: 'titre'}, () => {this.onSortChange(e)})} className={this.state.order === 'titre' ? 'checked' : ''}>Description</span></div>
                <div className="cell"><span onClick={(e) => this.setState({order: 'status'}, () => {this.onSortChange(e)})} className={this.state.order === 'status' ? 'checked' : ''}>Status</span></div>
                <div className="cell"><span onClick={(e) => this.setState({order: 'montant'}, () => {this.onSortChange(e)})} className={this.state.order === 'montant' ? 'checked' : ''}>Montant</span></div>
              </div>

              {Object.keys(devis).map((key, item, i) => {
                const date = new Date(devis[key].date);
                date.setDate(date.getDate());
                const mois = [
                  "jan", "fév", "mars",
                  "avr", "mai", "juin", "juil",
                  "août", "sept", "oct",
                  "nov", "déc"
                ];
                const dateReformat = date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear();

                if (Object.keys(devis[key].proposition).length > 0) {
                  return (
                    <Link to={{pathname: "/devis/vue-proposition", numero: key}} key={key}>
                      <div className="row_table shadows">
                        <div className="cell"><CheckBox /></div>
                        <div className="cell">{dateReformat}</div>
                        <div className="cell">{devis[key].entreprise}<br/><h5 className="proposition">Proposition commerciale</h5></div>
                        <div className="cell">{devis[key].titre}</div>
                        <div className="cell"><h5 className={devis[key].status}>{devis[key].status}</h5></div>
                        <div className="cell">{devis[key].montant}€</div>
                      </div>
                    </Link>
                  )
                } else {
                  return (
                    <Link to={{pathname: "/devis/vue", numero: key}} key={key}>
                      <div className="row_table shadows">
                        <div className="cell"><CheckBox /></div>
                        <div className="cell">{dateReformat}</div>
                        <div className="cell">{devis[key].entreprise}<br/><span>{devis[key].numero}</span></div>
                        <div className="cell">{devis[key].titre}</div>
                        <div className="cell"><h5 className={devis[key].status}>{devis[key].status}</h5></div>
                        <div className="cell">{devis[key].montant}€</div>
                      </div>
                    </Link>
                  )
                }
              })}
            </section>

          </main>
        </div>
      </div>
    );
  }
}

export default DevisPropositions;
