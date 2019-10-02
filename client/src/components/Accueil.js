import React from 'react';
import { Link } from 'react-router-dom';
import database from '../firebase/firebase';
import BarMontantEncaissement from './modules/BarMontantEncaissement';
import ProgressBarPaiement from './modules/ProgressBarPaiement';
import Aside from './Aside';
import 'react-chartjs-2';
import 'chartjs-plugin-annotation';

export class Accueil extends React.Component {
  constructor() {
    super();
    this.state = {
      encaissements: [],
      impayés: [],
      type: 'line',
      data: {
        labels: ["JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUI", "AOÛT", "SEP", "OCT", "NOV", "DEC"],
        datasets: [{
          label: "2019",
          pointBorderColor: "rgba(101, 87, 210, 1)",
          pointBackgroundColor: "rgba(255, 255, 255, 1)",
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "rgba(122, 109, 227, 1)",
          pointHoverBorderColor: "rgba(101, 87, 210, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 6,
          pointHitRadius: 6,
          fillColor: "rgba(229, 225, 249, 0.7)",
          strokeColor: "rgba(122, 109, 227, 1)",
          pointColor: "rgba(255, 255, 255, 1)",
          pointStrokeColor: "rgba(122, 109, 227, 1)",
          pointHighlightStroke: "rgba(101, 87, 210, 1)",
          data: [1900, 1700, 2100, 3600, 2200, 2500, 2000, 1700, 2100, 3600, 2200, 2500, 2000]
        }, {
          label: "2018",
          pointBorderColor: "rgba(0, 154, 138, 1)",
          pointBackgroundColor: "rgba(255, 255, 255, 1)",
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "rgba(0, 154, 138, 1)",
          pointHoverBorderColor: "rgba(0, 154, 138, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 6,
          pointHitRadius: 6,
          fillColor: "rgba(229, 225, 249, 0.7)",
          strokeColor: "rgba(122, 109, 227, 1)",
          pointColor: "rgba(255, 255, 255, 1)",
          pointStrokeColor: "rgba(122, 109, 227, 1)",
          pointHighlightStroke: "rgba(0, 154, 138, 1)",
          data: [900, 700, 1200, 950, 2500, 2900, 2300, 3300, 3700, 2600, 2950, 2300, 2700],
          spanGaps: true
        }, {
          label: "2017",
          pointBorderColor: "rgba(14, 29, 44, 1)",
          pointBackgroundColor: "rgba(255, 255, 255, 1)",
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "rgba(14, 29, 44, 1)",
          pointHoverBorderColor: "rgba(14, 29, 44, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 6,
          pointHitRadius: 6,
          fillColor: "rgba(91, 110, 127, 0.7)",
          strokeColor: "rgba(14, 29, 44, 1)",
          pointColor: "rgba(255, 255, 255, 1)",
          pointStrokeColor: "rgba(14, 29, 44, 1)",
          pointHighlightStroke: "rgba(14, 29, 44, 1)",
          data: [900, 700, 500, 950, 1500, 2900, 2300, 2300, 2700, 1600, 1950, 1300, 2700],
          spanGaps: true
        }, {
          label: "2016",
          pointBorderColor: "rgba(244, 92, 92, 1)",
          pointBackgroundColor: "rgba(255, 255, 255, 1)",
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "rgba(244, 92, 92, 1)",
          pointHoverBorderColor: "rgba(244, 92, 92, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 6,
          pointHitRadius: 6,
          fillColor: "rgba(91, 110, 127, 0.7)",
          strokeColor: "rgba(244, 92, 92, 1)",
          pointColor: "rgba(255, 255, 255, 1)",
          pointStrokeColor: "rgba(244, 92, 92, 1)",
          pointHighlightStroke: "rgba(244, 92, 92, 1)",
          data: [900, 700, 500, 950, 500, 2900, 3300, 2300, 2700, 2600, 1950, 2300, 700],
          spanGaps: true
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            title: function(tooltipItem, data) {
            },
            label: function(tooltipItem, data) {
              return data['datasets'][0]['data'][tooltipItem['index']] + ' €';
            }
          },
          backgroundColor: '#052841',
          titleFontSize: 0,
          titleFontColor: 'white',
          bodyFontColor: 'white',
          bodyFontSize: 12,
          bodyFontFamily: "'Inter-Medium', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          displayColors: false
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              drawTicks: false,
              display: false,
              drawBorder: false
            },
            ticks: {
              fontFamily: "'Inter-Medium', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              fontSize: 12,
              padding: 12,
              fontColor: "#a9bbc9"
            }
          }],
          yAxes: [{
            type: 'linear',
            display: true,
            gridLines: {
              drawTicks: false,
              display: true,
              drawBorder: false
            },
            ticks: {
              fontFamily: "'Inter-Medium', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              fontSize: 12,
              padding: 12,
              fontColor: "#a9bbc9",
              callback: function(value, index, values) {
                return value + ' €';
              }
            }
          }]
        },
        responsive: true
      }
    }
  }

  //Ecnaissements
  callEncaissements() {
    var today = new Date();
    // var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(mm < 10) {
      mm='0'+mm;
    }
    const month = yyyy + '-' + mm;
    database.ref('abonnement/factures').orderByChild('dateStatus').startAt(month).on('value', (snapshot) => {
      const factures = snapshot.val();
      const newState = [];
      var data = [];
      var total = 0;

      if (snapshot.exists()){
        for (let item in factures) {
          if(factures[item].status === 'payée') {
            newState.push({
              numero: item,
              entreprise: factures[item].entreprise,
              status: factures[item].status,
              titre: factures[item].titre,
              montant: factures[item].montant
            });
          }
        }
        //Total du ca trimestriel
        snapshot.forEach(ss => {
          if(ss.child('status').val() === 'payée') {
            data.push(ss.child('montant').val());
          }
        });
        for (var i = 0; i < data.length; i++) {
          total += data[i]
        }
        this.setState({
          encaissements: newState,
          facturesMontantMax: Math.max(...data),
          facturesTotal: total
        });
        if (mm >= 1 && mm <= 3) {
          this.setState({
            trimestre: '1 janvier au 31 mars ' + yyyy,
            prochaineDeclaration: 'Prochaine déclaration du 1 au 31 avril'
          });
        } else if (mm >= 4 && mm <= 6) {
          this.setState({
            trimestre: '1 avril au 31 juin ' + yyyy,
            prochaineDeclaration: 'Prochaine déclaration du 1 au 31 juillet'
          });
        } else if (mm >= 7 && mm <= 9) {
          this.setState({
            trimestre: '1 juillet au 31 septembre ' + yyyy,
            prochaineDeclaration: 'Prochaine déclaration du 1 au 31 octobre'
          });
        } else if (mm >= 10 && mm <= 12) {
          this.setState({
            trimestre: '1 octobre au 31 décembre ' + yyyy,
            prochaineDeclaration: 'Prochaine déclaration du 1 au 31 janvier'
          });
        }
      } else {
        this.setState({
          facturesTotal: 0
        });
      }
    });
  }

  //Impayés
  callImpayes() {
    database.ref('abonnement/factures').orderByChild('status').equalTo('Impayée').on('value', (snapshot) => {
      const impayés = snapshot.val();
      const newState = [];
      var data = [];
      var total = 0;

      if (snapshot.exists()){
        for (let item in impayés) {
          //Formatage date d'émission
          const dateEmission = new Date(impayés[item].date);
          var mm = dateEmission.getMonth() + 1;
          var dateEmissionFormat = dateEmission.getDate() + '-' + mm + '-';

          const datePaiementDu = new Date(impayés[item].date);
          datePaiementDu.setDate(datePaiementDu.getDate() + impayés[item].delaiPaiement);

          //Calcul nombre de jours restants ou retard du paiement
          var date1 = new Date(impayés[item].date);
          var date2 = new Date();
          var tempsDiff = Math.abs(date2.getTime() - date1.getTime());
          var diffJours = Math.ceil(tempsDiff / (1000 * 3600 * 24));

          newState.push({
            numero: item,
            entreprise: impayés[item].entreprise,
            status: impayés[item].status,
            titre: impayés[item].titre,
            date: impayés[item].dateEmissionFormat,
            dateDue: impayés[item].dateDue,
            delaiPaiement: impayés[item].delaiPaiement,
            JoursRestantsPaiement: diffJours,
            montant: impayés[item].montant
          });
        }
        snapshot.forEach(ss => {
           data.push(ss.child('montant').val());
        });
        for (var i = 0; i < data.length; i++) {
          total += data[i]
        }
        this.setState({
          impayés: newState,
          impayésTotal: total
        });
      } else {
        this.setState({
          impayésTotal: 0
        });
      }
    });
  }

  //Chiffre d'affaire par année
  callCA() {
    var today = new Date();
    var yyyy = today.getFullYear();
    database.ref('abonnement/factures').orderByChild('dateStatus').startAt(yyyy).on('value', (snapshot) => {
      const factures = snapshot.val();
      const newState = [];
      var data = [];

      if (snapshot.exists()){
        for (let item in factures) {
          newState.push({
            status: factures[item].status,
            montant: factures[item].montant
          });
        }
        snapshot.forEach(ss => {
           data.push(ss.child('montant').val());
        });
      }
    });
  }

  //Diagramme chiffre d'affaire
  callDiagramme() {
    let object = this.state;
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let gradientStrokeA = ctx.createLinearGradient(0, 400, 0, 100);
    let gradientFillColorA = ctx.createLinearGradient(0, 0, width, 0);
    let gradientStrokeB = ctx.createLinearGradient(0, 400, 0, 100);
    let gradientFillColorB = ctx.createLinearGradient(0, 0, width, 0);
    let gradientStrokeC = ctx.createLinearGradient(0, 400, 0, 100);
    let gradientFillColorC = ctx.createLinearGradient(0, 0, width, 0);
    let gradientStrokeD = ctx.createLinearGradient(0, 400, 0, 100);
    let gradientFillColorD = ctx.createLinearGradient(0, 0, width, 0);

    gradientStrokeA.addColorStop(0, '#ffffff');
    gradientStrokeA.addColorStop(1, 'rgba(229, 225, 249, 0.7)');
    gradientFillColorA.addColorStop(1, 'rgba(122, 109, 227, 1)');

    gradientStrokeB.addColorStop(0, '#ffffff');
    gradientStrokeB.addColorStop(1, 'rgba(113, 230, 217, 0.7)');
    gradientFillColorB.addColorStop(1, 'rgba(0, 154, 138, 1)');

    gradientStrokeC.addColorStop(0, '#ffffff');
    gradientStrokeC.addColorStop(1, 'rgba(28, 67, 103, 0.7)');
    gradientFillColorC.addColorStop(1, 'rgba(28, 67, 103, 1)');

    gradientStrokeD.addColorStop(0, '#ffffff');
    gradientStrokeD.addColorStop(1, 'rgba(244, 92, 92, 0.7)');
    gradientFillColorD.addColorStop(1, 'rgba(244, 92, 92, 1)');

    object.data.datasets['0'].backgroundColor = gradientStrokeA;
    object.data.datasets['0'].borderColor = gradientFillColorA;
    object.data.datasets['1'].backgroundColor = gradientStrokeB;
    object.data.datasets['1'].borderColor = gradientFillColorB;
    object.data.datasets['2'].backgroundColor = gradientStrokeC;
    object.data.datasets['2'].borderColor = gradientFillColorC;
    object.data.datasets['3'].backgroundColor = gradientStrokeD;
    object.data.datasets['3'].borderColor = gradientFillColorD;
  }

  componentDidMount() {
    this.callEncaissements()
    this.callImpayes()
    this.callCA()
    this.callDiagramme()
  }

  componentDidUpdate() {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    // window.myLineChart = new Chart(ctx, this.state).Line(salesData, {});
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="dashboard">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-4 columns">
                  <h1>Dashboard</h1>
                </div>
                <div className="large-8 columns">
                  <Link to="/edit-devis"><button className="align-right">Créer un devis</button></Link>
                  <Link to="/edit-facture"><button className="align-right">Créer une facture</button></Link>
                  <Link to="/edit-proposition-commerciale"><button className="align-right">Créer un contrat</button></Link>
                </div>
              </div>
            </section>

            <section className="section-2 container transparent">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h2>Encaissements trimestriel</h2>
                  <h3 className="sub-headline lynch">{this.state.trimestre}</h3>
                </div>
                <div className="large-6 columns">
                  <p className="text-right"><strong className="tarawera">{this.state.prochaineDeclaration}</strong></p>
                </div>
              </div>
              <div className="container shadows">
                <div className="box-ca-total">
                  <h3 className="cornflower-blue">{this.state.facturesTotal}€</h3>
                  <p className="lynch">Chiffre d'affaire</p>
                  <h4 className="tarawera">{((this.state.facturesTotal / 100) * 24.2).toFixed(2)}€</h4>
                  <p className="lynch">Cotisations 24,2%</p>
                  <h4 className="tarawera">{(this.state.facturesTotal - (this.state.facturesTotal / 100) * 24.2).toFixed(2)}€</h4>
                  <p className="lynch">Bénéfice</p>
                </div>

                {this.state.encaissements.map((item) => {
                  return (
                    <div className="row" key={item.numero}>
                      <Link to={{pathname: "/factures/vue", numero: item.numero}}>
                      <div className="large-7 columns">
                        <p><strong>{item.entreprise}</strong><br/> {item.titre}</p>
                      </div>
                      <div className="large-5 columns">
                        <BarMontantEncaissement montant={item.montant} width={ item.montant / (this.state.facturesMontantMax / 100)}/>
                      </div>
                      </Link>
                    </div>
                  )
                })}

              </div>
            </section>

            <section className="section-3 container transparent">
              <h2>En attente de paiement</h2>
              <div className="container shadows">
                <div className="box-ca-total">
                  <h3 className="cornflower-blue">{this.state.impayésTotal}€</h3>
                  <p className="lynch">En attente</p>
                  <h3 className="radical-red">2030€</h3>
                  <p className="lynch">En retard</p>
                </div>
                {this.state.impayés.map((item) => {
                  return (
                    <div className="row" key={item.numero}>
                      <Link to={{pathname: "/factures/vue", numero: item.numero}}>
                      <div className="large-7 columns">
                        <p><strong>{item.entreprise}</strong><br/> {item.titre}</p>
                      </div>
                      <div className="large-5 columns">
                        <ProgressBarPaiement status={item.status} joursRestantsPaiement={item.JoursRestantsPaiement} delaiPaiement={item.delaiPaiement}/>
                      </div>
                      </Link>
                    </div>
                  )
                })}

              </div>
            </section>

            <section className="section-4 container transparent">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h2>Chiffre d’affaire</h2>
                </div>
              </div>
              <div className="container shadows">
                <div className="row-fluid">
                  <div className="large-3 columns">
                    <h2>22550€</h2>
                    <p className="lynch">Encaissements en 2019</p>
                  </div>
                  <div className="large-4 columns text-left">
                    <h2>11750€</h2>
                    <p className="lynch">Bénéfice 2019 après cotisations</p>
                  </div>
                  <div className="large-5 columns text-left">
                    <ul className="year">
                      <li className="current">2019</li>
                      <li>2018</li>
                      <li>2017</li>
                      <li>2016</li>
                    </ul>
                  </div>
                </div>
                <canvas id="salesData"></canvas>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default Accueil;
