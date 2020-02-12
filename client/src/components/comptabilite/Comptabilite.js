import React from 'react';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import database from '../../firebase/firebase';
import CheckBox from '../modules/CheckBox';
import Aside from '../Aside';
import 'react-chartjs-2';
import 'chartjs-plugin-annotation';
const createReactClass = require('create-react-class');

export class Comptabilite extends React.Component {
  constructor(props) {
    const yyyy = new Date().getFullYear();
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      factures: [],
      facturesCompta: [],
      annees: [yyyy, yyyy-1, yyyy-2, yyyy-3, yyyy-4],
      annee: yyyy,
      premierTrim: [],
      deuxiemeTrim: [],
      troisiemeTrim: [],
      quatriemeTrim: [],
      premierTrimMois: [],
      deuxiemeTrimMois: [],
      troisiemeTrimMois: [],
      quatriemeTrimMois: [],
      premierTrimLabels: ['Jan', 'Fev', 'Mars'],
      deuxiemeTrimLabels: ['Avril', 'Mai', 'Juin'],
      troisiemeTrimLabels: ['Jui', 'Aout', 'Sept'],
      quatriemeTrimLabels: ['Oct','Nov','Dec'],
      colors: ['#7a5cec', '#7a5cec', '#7a5cec']
    }
    this.handleAnnee = this.handleAnnee.bind(this);
  }

  //Livre des recettes
  callLivreRecettes(res) {
    const newState = [];
    if (res) {
      for (let item in res) {
        //Formatage data
        const date = new Date(res[item].dateStatus);
        date.setDate(date.getDate());
        const mois = [
          "jan", "fév", "mars",
          "avr", "mai", "juin", "juil",
          "août", "sept", "oct",
          "nov", "déc"
        ];
        const dateReformat = date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear();

        if (res[item].status === 'Payée') {
          newState.push({
            numero: item,
            date: dateReformat,
            entreprise: res[item].entreprise,
            titre: res[item].titre,
            montant: res[item].montant
          });
        }
      }
      this.setState({
        factures: newState,
      });
    } else {
      this.setState({
        factures: []
      });
    }
  }

  //Totaux du CA pour chaque trimestre
  callTrimestres() {
    const yyyy = this.state.annee;
    database.ref('abonnement/factures').orderByChild('dateStatus').startAt(yyyy+'-01').endAt(yyyy+'-12').on('value', (snapshot) => {
      const newState = [];
      const montants1erTrim = [];
      const montants2emeTrim = [];
      const montants3emeTrim = [];
      const montants4emeTrim = [];
      const premierTrimMois = [];
      const deuxiemeTrimMois = [];
      const troisiemeTrimMois = [];
      const quatriemeTrimMois = [];
      const montantsJanvier = [];
      const montantsFevrier = [];
      const montantsMars = [];
      const montantsAvril = [];
      const montantsMai = [];
      const montantsJuin = [];
      const montantsJuillet = [];
      const montantsAout = [];
      const montantsSeptembre = [];
      const montantsOctobre = [];
      const montantsNovembre = [];
      const montantsDecembre = [];
      var total1erTrim, total2emeTrim, total3emeTrim, total4emeTrim, totalJanvier, totalFevrier, totalMars, totalAvril, totalMai, totalJuin, totalJuillet, totalAout, totalSeptembre, totalOctobre, totalNovembre, totalDecembre;
      total1erTrim = total2emeTrim = total3emeTrim = total4emeTrim = totalJanvier = totalFevrier = totalMars = totalAvril = totalMai = totalJuin = totalJuillet = totalAout = totalSeptembre = totalOctobre = totalNovembre = totalDecembre = 0;

      if (snapshot.exists()){
        snapshot.forEach(ss => {
          if((ss.child('status').val() === 'payée') && ((ss.child('dateStatus').val().startsWith(yyyy+'-01')) || (ss.child('dateStatus').val().startsWith(yyyy+'-02')) || (ss.child('dateStatus').val().startsWith(yyyy+'-03')))) {
            montants1erTrim.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && ((ss.child('dateStatus').val().startsWith(yyyy+'-04')) || (ss.child('dateStatus').val().startsWith(yyyy+'-05')) || (ss.child('dateStatus').val().startsWith(yyyy+'-06')))) {
            montants2emeTrim.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && ((ss.child('dateStatus').val().startsWith(yyyy+'-07')) || (ss.child('dateStatus').val().startsWith(yyyy+'-08')) || (ss.child('dateStatus').val().startsWith(yyyy+'-09')))) {
            montants3emeTrim.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && ((ss.child('dateStatus').val().startsWith(yyyy+'-10')) || (ss.child('dateStatus').val().startsWith(yyyy+'-11')) || (ss.child('dateStatus').val().startsWith(yyyy+'-12')))) {
            montants4emeTrim.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-01'))) {
            montantsJanvier.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-02'))) {
            montantsFevrier.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-03'))) {
            montantsMars.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-04'))) {
            montantsAvril.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-05'))) {
            montantsMai.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-06'))) {
            montantsJuin.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-07'))) {
            montantsJuillet.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-08'))) {
            montantsAout.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-09'))) {
            montantsSeptembre.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-10'))) {
            montantsOctobre.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-11'))) {
            montantsNovembre.push(ss.child('montant').val());
          }
          if((ss.child('status').val() === 'payée') && (ss.child('dateStatus').val().startsWith(yyyy+'-12'))) {
            montantsDecembre.push(ss.child('montant').val());
          }
        });
        for (var a = 0; a < montants1erTrim.length; a++) {
          total1erTrim += montants1erTrim[a]
        }
        for (var b = 0; b < montants2emeTrim.length; b++) {
          total2emeTrim += montants2emeTrim[b]
        }
        for (var c = 0; c < montants3emeTrim.length; c++) {
          total3emeTrim += montants3emeTrim[c]
        }
        for (var d = 0; d < montants4emeTrim.length; d++) {
          total4emeTrim += montants4emeTrim[d]
        }
        for (var e = 0; e < montantsJanvier.length; e++) {
          totalJanvier += montantsJanvier[e]
        }
        for (var f = 0; f < montantsFevrier.length; f++) {
          totalFevrier += montantsFevrier[f]
        }
        for (var g = 0; g < montantsMars.length; g++) {
          totalMars += montantsMars[g]
        }
        for (var h = 0; h < montantsAvril.length; h++) {
          totalAvril += montantsAvril[h]
        }
        for (var i = 0; i < montantsMai.length; i++) {
          totalMai += montantsMai[i]
        }
        for (var j = 0; j < montantsJuin.length; j++) {
          totalJuin += montantsJuin[j]
        }
        for (var k = 0; k < montantsJuillet.length; k++) {
          totalJuillet += montantsJuillet[k]
        }
        for (var l = 0; l < montantsAout.length; l++) {
          totalAout += montantsAout[l]
        }
        for (var m = 0; m < montantsSeptembre.length; m++) {
          totalSeptembre += montantsSeptembre[m]
        }
        for (var n = 0; n < montantsOctobre.length; n++) {
          totalOctobre += montantsOctobre[n]
        }
        for (var o = 0; o < montantsNovembre.length; o++) {
          totalNovembre += montantsNovembre[o]
        }
        for (var p = 0; p < montantsDecembre.length; p++) {
          totalDecembre += montantsDecembre[p]
        }

        premierTrimMois.push([totalJanvier, totalFevrier, totalMars]);
        deuxiemeTrimMois.push([totalAvril, totalMai, totalJuin]);
        troisiemeTrimMois.push([totalJuillet, totalAout, totalSeptembre]);
        quatriemeTrimMois.push([totalOctobre, totalNovembre, totalDecembre]);
        this.setState({
          factures: newState,
          premierTrimMois: premierTrimMois,
          premierTrim: {
            total: total1erTrim,
            charges: (total1erTrim / 100) * 22,
            formation: (total1erTrim / 100) * 0.3,
            adeclarer: ((total1erTrim / 100) * 22.3).toFixed(2)
          },
          deuxiemeTrimMois: deuxiemeTrimMois,
          deuxiemeTrim: {
            total: total2emeTrim,
            charges: (total2emeTrim / 100) * 22,
            formation: (total2emeTrim / 100) * 0.3,
            adeclarer: ((total2emeTrim / 100) * 22.3).toFixed(2)
          },
          troisiemeTrimMois: troisiemeTrimMois,
          troisiemeTrim: {
            total: total3emeTrim,
            charges: (total3emeTrim / 100) * 22,
            formation: (total3emeTrim / 100) * 0.3,
            adeclarer: ((total3emeTrim / 100) * 22.3).toFixed(2)
          },
          quatriemeTrimMois: quatriemeTrimMois,
          quatriemeTrim: {
            total: total4emeTrim,
            charges: (total4emeTrim / 100) * 22,
            formation: (total4emeTrim / 100) * 0.3,
            adeclarer: ((total4emeTrim / 100) * 22.3).toFixed(2)
          }
        });
      } else {
        this.setState({
          premierTrim: {total: 0,charges: 0,formation: 0,adeclarer: 0},
          deuxiemeTrim: {total: 0,charges: 0,formation: 0,adeclarer: 0},
          troisiemeTrim: {total: 0,charges: 0,formation: 0,adeclarer: 0},
          quatriemeTrim: {total: 0,charges: 0,formation: 0,adeclarer: 0}
        });
      }
    });
  }

  handleAnnee (item, e) {
    const yyyy = item;
    this.setState({
      annee: yyyy
    });
    this.callTrimestres();
  }

  downloadLivreRecettes() {
    const doc = new jsPDF({
      orientation: 'landscape'
    });
    const totalPagesExp = '{total_pages_count_string}';

    function headRows() {
      return [{paye_le: 'Payé le', numero: 'Numéro de facture', client: 'Client', nature: 'Nature', montant: 'Montant', mode_encaissement: 'Mode d encaissement'}];
    }

    function bodyRows(rowCount) {
      rowCount = rowCount || 10;
      let body = [];

      // fetch('/factures')
      //   .then(res => res.json())
      //   .then(res => {
      //     for (var i = 1; i <= res.length; i++) {
      //       body.push({
      //         paye_le: res[i].date,
      //         numero: res[i],
      //         client: res[i].entreprise,
      //         nature: res[i].titre,
      //         montant: res[i].montant,
      //         mode_encaisement: 'Virement bancaire'
      //       });
      //     }
      //   })

      for (var j = 1; j <= rowCount; j++) {
        body.push({
          paye_le: '06/02/2019',
          numero: '20190129-81',
          client: 'Eleius',
          nature: 'Intégration site Dolead',
          montant: '420',
          mode_encaissement: 'Virement bancaire'
        });
      }
      return body;
    }

    doc.autoTable({
      headStyles: {
        fillColor: [99, 62, 197],
        textColor: [255, 255, 255]
      },
      head: headRows(),
      body: bodyRows(40),
      didDrawPage: function (data) {
        var pageWidth = doc.internal.pageSize.width;
        var pageCenterX = pageWidth / 2;

        var str = doc.internal.getNumberOfPages()
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + " / " + totalPagesExp;
        }
        let pageInfo = doc.internal.getCurrentPageInfo();
        if (pageInfo.pageNumber <= 1) {
          doc.setFontSize(20);
          doc.setTextColor(40);
          doc.setFontStyle('normal');
          // doc.text("Chronologie des recettes 2019", pageCenterX, 18, 'center');
        }

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.setFontSize(12);
        doc.setTextColor(168, 168, 168);
        // doc.text(str, pageCenterX, pageHeight - 10);
      },
      margin: {top: 22}
    });

     // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    // doc.save('livre-recettes-2019.pdf')
    window.open(doc.output('bloburl'))
  }

  downloadRegistreAchats() {
    const doc = new jsPDF({
      orientation: 'landscape'
    });
    const totalPagesExp = '{total_pages_count_string}';

    function headRows() {
      return [{paye_le: 'Payé le', numero: 'Numéro de facture', client: 'Client', nature: 'Nature', montant: 'Montant', mode_encaissement: 'Mode d encaissement'}];
    }

    function bodyRows(rowCount) {
      rowCount = rowCount || 10;
      let body = [];

      // fetch('/factures')
      //   .then(res => res.json())
      //   .then(res => {
      //     for (var i = 1; i <= res.length; i++) {
      //       body.push({
      //         paye_le: res[i].date,
      //         numero: res[i],
      //         client: res[i].entreprise,
      //         nature: res[i].titre,
      //         montant: res[i].montant,
      //         mode_encaisement: 'Virement bancaire'
      //       });
      //     }
      //   })

      for (var j = 1; j <= rowCount; j++) {
        body.push({
          paye_le: '06/02/2019',
          numero: '20190129-81',
          client: 'Eleius',
          nature: 'Intégration site Dolead',
          montant: '420',
          mode_encaissement: 'Virement bancaire'
        });
      }
      return body;
    }

    doc.autoTable({
      headStyles: {
        fillColor: [99, 62, 197],
        textColor: [255, 255, 255]
      },
      head: headRows(),
      body: bodyRows(40),
      didDrawPage: function (data) {
        var pageWidth = doc.internal.pageSize.width;
        var pageCenterX = pageWidth / 2;

        var str = doc.internal.getNumberOfPages()
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + " / " + totalPagesExp;
        }
        let pageInfo = doc.internal.getCurrentPageInfo();
        if (pageInfo.pageNumber <= 1) {
          doc.setFontSize(20);
          doc.setTextColor(40);
          doc.setFontStyle('normal');
          // doc.text("Chronologie des recettes 2019", pageCenterX, 18, 'center');
        }

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.setFontSize(12);
        doc.setTextColor(168, 168, 168);
        // doc.text(str, pageCenterX, pageHeight - 10);
      },
      margin: {top: 22}
    });

     // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    // doc.save('livre-recettes-2019.pdf')
    window.open(doc.output('bloburl'))
  }

  componentDidMount() {
    this.callTrimestres()
    fetch('/factures')
      .then(res => res.json())
      .then(res => this.callLivreRecettes(res))
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

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="comptabilite">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h1>Comptabilité</h1>
                  {this.years()}
                </div>
              </div>
            </section>

            <section className="section-2 container transparent">
              <div className="container shadows" id="tableau-comptabilite">
                <table>
                  <td>
                    <h2>Trimestre 1, janvier - mars</h2>
                    <tr>
                      <td><h5>Chiffre d'affaire</h5></td>
                      <td></td>
                      <td><p>{this.state.premierTrim.total}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Charges sur prestations</p></td>
                      <td><p>22%</p></td>
                      <td><p>{this.state.premierTrim.charges}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Cotisations pour la formation professionnelle</p></td>
                      <td><p>0.3%</p></td>
                      <td><p>{this.state.premierTrim.formation}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Total à déclarer</p></td>
                      <td><p>22.3%</p></td>
                      <td><p>{this.state.premierTrim.adeclarer}€</p></td>
                    </tr>
                  </td>
                  <td>
                    <Charts
                      data={ this.state.premierTrimMois }
                      labels={ this.state.premierTrimLabels }
                      colors={ this.state.colors }
                      height={ 250 }
                    />
                  </td>
                </table>

                <table>
                  <td>
                    <h2>Trimestre 2, avril - juin</h2>
                    <tr>
                      <td><h5>Chiffre d'affaire</h5></td>
                      <td></td>
                      <td><p>{this.state.deuxiemeTrim.total}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Charges sur prestations</p></td>
                      <td><p>22%</p></td>
                      <td><p>{this.state.deuxiemeTrim.charges}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Cotisations pour la formation professionnelle</p></td>
                      <td><p>0.3%</p></td>
                      <td><p>{this.state.deuxiemeTrim.formation}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Total à déclarer</p></td>
                      <td><p>22.3%</p></td>
                      <td><p>{this.state.deuxiemeTrim.adeclarer}€</p></td>
                    </tr>
                  </td>
                  <td>
                    <Charts
                      data={ this.state.deuxiemeTrimMois }
                      labels={ this.state.deuxiemeTrimLabels }
                      colors={ this.state.colors }
                      height={ 250 }
                    />
                  </td>
                </table>

                <table>
                  <td>
                    <h2>Trimestre 3, juillet - septembre</h2>
                    <tr>
                      <td><h5>Chiffre d'affaire</h5></td>
                      <td></td>
                      <td><p>{this.state.troisiemeTrim.total}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Charges sur prestations</p></td>
                      <td><p>22%</p></td>
                      <td><p>{this.state.troisiemeTrim.charges}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Cotisations pour la formation professionnelle</p></td>
                      <td><p>0.3%</p></td>
                      <td><p>{this.state.troisiemeTrim.formation}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Total à déclarer</p></td>
                      <td><p>22.3%</p></td>
                      <td><p>{this.state.troisiemeTrim.adeclarer}€</p></td>
                    </tr>
                  </td>
                  <td>
                    <Charts
                      data={ this.state.troisiemeTrimMois }
                      labels={ this.state.troisiemeTrimLabels }
                      colors={ this.state.colors }
                      height={ 250 }
                    />
                  </td>
                </table>

                <table>
                  <td>
                    <h2>Trimestre 4, octobre - décembre</h2>
                    <tr>
                      <td><h5>Chiffre d'affaire</h5></td>
                      <td></td>
                      <td><p>{this.state.quatriemeTrim.total}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Charges sur prestations</p></td>
                      <td><p>22%</p></td>
                      <td><p>{this.state.quatriemeTrim.charges}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Cotisations pour la formation professionnelle</p></td>
                      <td><p>0.3%</p></td>
                      <td><p>{this.state.quatriemeTrim.formation}€</p></td>
                    </tr>
                    <tr>
                      <td><p>Total à déclarer</p></td>
                      <td><p>22.3%</p></td>
                      <td><p>{this.state.quatriemeTrim.adeclarer}€</p></td>
                    </tr>
                  </td>
                  <td>
                    <Charts
                      data={ this.state.quatriemeTrimMois }
                      labels={ this.state.quatriemeTrimLabels }
                      colors={ this.state.colors }
                      height={ 250 }
                    />
                  </td>
                </table>
                <div className="" style={{position: 'relative', margin: '0 auto', display: 'table'}}>
                  <button onClick={() => this.downloadLivreRecettes()} className="align-right">Télécharger le livre des recettes</button>
                  <button onClick={() => this.downloadRegistreAchats()} className="align-right">Télécharger le registre des achats</button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      );
    }
  }

  const Charts = createReactClass({
  	render() {
  		var self = this,
  			data = this.props.data,
  			layered = this.props.grouping === 'layered' ? true : false,
  			stacked = this.props.grouping === 'stacked' ? true : false,
  			max = 0;

  		for (var i = data.length; i--; ) {
  			for (var j = data[i].length; j--; ) {
  				if (data[i][j] > max) {
  					max = data[i][j];
  				}
  			}
  		}

  		return (
  			<div className={ 'charts-compta' + (this.props.horizontal ? ' horizontal' : '' ) }>
  				{ data.map(function (serie, serieIndex) {
  				 	var sortedSerie = serie.slice(0),
  				 		sum;

  				 	sum = serie.reduce(function (carry, current) {
  				 		return carry + current;
  					}, 0);
  				 	sortedSerie.sort();

  					return (
  						<div className={ 'Charts--serie ' + (self.props.grouping) }
  				 			key={ serieIndex }
  							style={{ height: '150px' }}
  						>
  						{ serie.map(function (item, itemIndex) {
                var labels = self.props.labels[itemIndex];
  							var color = self.props.colors[itemIndex], style,
  								size = item / (stacked ? sum : max) * 100;

  							style = {
  								zIndex: item
  							};

  							if (self.props.horizontal) {
  								style['width'] = '20px';
  							} else {
  								style['height'] = size + '%';
  							}

  						 return (
  							 <div
  							 	className={ 'Charts--item ' + (self.props.grouping) }
  							 	style={ style }
  								key={ itemIndex }
  							 >
  							 	<b>{ item }€</b>
                  <p>{ labels }</p>
  							 </div>
  						);
  						}) }
  						</div>
  					);
  				}) }
  			</div>
		);
	}
})

export default Comptabilite;
