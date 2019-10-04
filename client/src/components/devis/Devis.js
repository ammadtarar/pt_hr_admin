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
    fetch('http://localhost:8081/devis')
      .then(res => res.json())
      .then(res => this.callDevis(res))
  }

  callDevis(res) {
    const newState = [];
    for (let item in res) {
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

      newState.push({
        numero: item,
        entreprise: res[item].entreprise,
        date: dateReformat,
        status: res[item].status,
        dateStatus: res[item].dateStatus,
        titre: res[item].titre,
        montant: res[item].montant,
        proposition: res[item].proposition
      });
    }
    this.setState({
      devis: newState
    });
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="devis">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-5 columns">
                  <h1>Devis et propositions commerciales</h1>
                </div>
                <div className="large-7 columns">
                  <Link to="/devis/creer"><button className="align-right">Créer un devis</button></Link>
                  <Link to="/devis/edit-proposition"><button className="align-right">Créer une proposition commerciale</button></Link>
                  <ul className="year">
                    <li className="current">2019</li>
                    <li>2018</li>
                    <li>2017</li>
                    <li>2016</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="container transparent table" id="tableau-devis">
              <div className="row_table header">
                <div className="cell"><CheckBox /></div>
                <div className="cell">Émis le</div>
                <div className="cell">Client</div>
                <div className="cell">Description</div>
                <div className="cell">Status</div>
                <div className="cell">Montant</div>
              </div>

              {this.state.devis.map((item) => {
                if (Object.keys(item.proposition).length > 0) {
                  return (
                    <Link to={{pathname: "/devis/vue-proposition", numero: item.numero}} key={item.numero}>
                      <div className="row_table shadows">
                        <div className="cell"><CheckBox /></div>
                        <div className="cell">{item.date}</div>
                        <div className="cell">{item.entreprise}<br/><h5 className="proposition">Proposition commerciale</h5></div>
                        <div className="cell">{item.titre}</div>
                        <div className="cell"><h5 className={item.status}>{item.status}</h5></div>
                        <div className="cell">{item.montant}€</div>
                      </div>
                    </Link>
                  )
                } else {
                  return (
                    <Link to={{pathname: "/devis/vue", numero: item.numero}} key={item.numero}>
                      <div className="row_table shadows">
                        <div className="cell"><CheckBox /></div>
                        <div className="cell">{item.date}</div>
                        <div className="cell">{item.entreprise}<br/><span>{item.numero}</span></div>
                        <div className="cell">{item.titre}</div>
                        <div className="cell"><h5 className={item.status}>{item.status}</h5></div>
                        <div className="cell">{item.montant}€</div>
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
