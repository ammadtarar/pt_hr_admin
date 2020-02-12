import React from 'react';
import { Link } from 'react-router-dom';
import database from '../../firebase/firebase';
import Aside from '../Aside';
import printPDF from '../../jspdf/print/jspdf-proposition';

export class VueProposition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponentProbleme: true,
      showComponentSolution: true,
      showComponentPlanning: true,
      showComponentServicesAdditionnels: true,
      showComponentPourquoi: true,
      showComponentTemoignages: true,
      showComponentCTA: true,
      prestataire: {
        prenom: '',
        nom: '',
        adresse: '',
        ville: '',
        cp: '',
        pays: '',
        telephone: '',
        email: '',
        siteweb: '',
        tauxhoraire: ''
      },
      client: {
        entreprise: '',
        nom: '',
        prenom: '',
        adresse: '',
        cp: '',
        ville: '',
        pays: ''
      },
      numero: this.props.location.numero,
      date: '',
      status: '',
      dateStatus: '',
      titre: '',
      description: '',
      montantht: '',
      montant: '',
      acompte: '',
      proposition: {
        probleme: 'Décrivez la problématique du projet, le défi à relever',
        solution: 'Parlez des objectifs, et des résultats que vous délivrerez à votre client',
        planification: 'Entrez les détails de la planification du projet',
        servicesAdditionnels: 'Entrez les détails des services additionnels que vous fournirez au client...',
        pourquoi: 'Entrez pourquoi le client devrait travailler avec vous, parlez de vos garanties, vos engagements, de votre différence',
        temoignages: 'Entrez 2 ou 3 témoignages clients. Les clients y accordent une grande importance. Ou montrez une étude de cas que vous avez réalisé avec les résultats obtenus.',
        note: 'Entrez une note, par exemple relatif au versement bancaire (optionnel)',
        conditions: 'Entrez les termes et conditions (optionnel)'
      }
    }
  }

  componentDidMount() {
    database.ref('abonnement').on('value', (snapshot) => {
      const val = snapshot.val();

      this.setState({
        prestataire: {
          prenom: val.configuration.prenom,
          nom: val.configuration.nom,
          adresse: val.configuration.adresse,
          cp: val.configuration.cp,
          ville: val.configuration.ville,
          pays: val.configuration.pays,
          telephone: val.configuration.entreprise.telephone,
          email: val.configuration.entreprise.email,
          siteweb: val.configuration.entreprise.siteweb,
          tauxhoraire: val.configuration.tauxHoraire
        }
      });
    });

    const numero = this.props.location.numero;
    database.ref(`abonnement/devis/${numero}`).on('value', (snapshot) => {
      const val = snapshot.val();
      sessionStorage.setItem('devis', JSON.stringify(val));
      const devis = JSON.parse(sessionStorage.getItem('devis'));
      const montantht = devis.montant;
      const montant = (((montantht / 100) * 20) + montantht);
      const acomptePourcentage = devis.acompte;
      const acompte = (((montant / 100) * acomptePourcentage));

      //Formatage date status
      const dateStatus = new Date(devis.dateStatus);
      const mois = [
        "janvier", "février", "mars",
        "avril", "mai", "juin", "juillet",
        "août", "septembre", "octobre",
        "novembre", "décembre"
      ];
      const dateDernierStatus = dateStatus.getDate() + ' ' + mois[dateStatus.getMonth()] + ' ' + dateStatus.getFullYear();

      this.setState({
        numero: numero,
        titre: devis.titre,
        date: devis.date,
        dateStatus: dateDernierStatus,
        backgroundStatus: 'container-status-devis ' + devis.status,
        status: devis.status,
        description: devis.description,
        montantht: devis.montant,
        montant: montant,
        acomptePourcentage: devis.acompte,
        acompte: acompte,
        client: {
          entreprise: devis.entreprise,
          nom: devis.nom,
          prenom: devis.prenom,
          adresse: devis.adresse,
          cp: devis.cp,
          ville: devis.ville
        },
        proposition: {
          probleme: devis.proposition.probleme,
          solution: devis.proposition.solution,
          planification: devis.proposition.planification,
          servicesAdditionnels: devis.proposition.servicesAdditionnels,
          pourquoi: devis.proposition.pourquoi,
          temoignages: devis.proposition.temoignages,
          note: devis.proposition.note,
          conditions: devis.proposition.conditions
        }
      });
    });
  }

  downloadProposition() {
    printPDF(this.state.printProposition);
  }

  render() {
    let logo;
    database.ref(`abonnement/configuration/entreprise/logo/upload/dataURL`).on('value', (snapshot) => {
      const val = snapshot.val();
      sessionStorage.setItem('logo', JSON.stringify(val));
      const dataURL = JSON.parse(sessionStorage.getItem('logo'));
      if (snapshot.exists()) {
        logo = <img type="image/svg+xml" className="logo" src={dataURL} alt=""/>
      } else {
        logo = <img type="image/svg+xml" className="logo" src="/images/adloop-logo.svg" alt=""/>
      }
    });

    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="proposition-vue">
            <section className="container transparent">
              <div className="row-fluid">
                <div className="small-2 large-8 columns">
                  <Link to="/devis"><p className="retour">Devis et propositions commerciales</p></Link>
                </div>
              </div>
            </section>

            <section className="container transparent">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h1>{this.state.titre}</h1>
                </div>
                <div className="large-6 columns">
                  <Link to="/devis"><button className="align-right" onClick={() => this.downloadProposition()}>Télécharger PDF</button></Link>
                  <Link to={{pathname: "/devis/edit-proposition", numero: this.state.numero}}><button className="align-right">Éditer</button></Link>
                  <Link to="/devis"><button className="btn-fourth align-right">Plus d'options</button></Link>
                </div>
              </div>
            </section>

            <section className={this.state.backgroundStatus}>
              <p><span>{this.state.status}</span> le {this.state.dateStatus}</p>
            </section>

            <section className="">
              <div className="container container-paper transparent">
                <h3 className="prevision-taxes">Taxes à prévoir sur cette proposition : 960€</h3>
                <div className="container container-cover container-proposition">
                  <div className="cover-proposition">
                    {logo}
                    <h2>{this.state.titre}</h2>
                    <div className="row-fluid">
                      <div className="large-6 columns">
                        <p className="eastern-blue">Préparé par</p>
                        <div className="row">
                          <p style={{display: 'inline-block', marginRight: 3}}>{this.state.prestataire.prenom}</p>
                          <p style={{display: 'inline-block'}}>{this.state.prestataire.nom}</p>
                        </div>
                      </div>
                      <div className="large-6 columns">
                        <p className="eastern-blue">Préparé pour</p>
                        <div className="row">
                          <input
                            name="entreprise"
                            value={this.state.client.entreprise}
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-center"><input
                      name="cp"
                      value={this.state.prestataire.email}
                    /></p>
                    <p className="text-center"><input
                      name="ville"
                      value={this.state.prestataire.siteweb}
                    /></p>
                  </div>
                </div>

                <div className="container container-proposition">

                </div>

                {this.state.showComponentProbleme &&
                  <div className="container container-proposition">
                    <h2>Le défi</h2>
                    <textarea
                      className="lynch"
                      name="probleme"
                      value={this.state.proposition.probleme}
                     />
                  </div>
                }

                {this.state.showComponentSolution &&
                  <div className="container container-proposition">
                    <h2>Les résultats délivrés</h2>
                    <textarea
                      className="lynch"
                      name="solution"
                      value={this.state.proposition.solution}
                     />
                  </div>
                }

                <div className="container container-proposition container-offres">
                  <h2 className="text-center">Votre investissement</h2>
                  <div className="row-fluid">
                    <div className="large-6 columns">
                      <div className="box-offre">
                        <h4 className="text-center">Une seule option</h4>
                      </div>
                    </div>
                    <div className="large-6 columns">
                      <div className="box-offre">
                        <h4 className="text-center">Packages</h4>
                      </div>
                    </div>
                  </div>

                  <table className="service-single-option">
                    <thead>
                      <tr>
                        <td><p className="cornflower-blue">Description</p></td>
                        <td><p className="cornflower-blue">Tarif horaire</p></td>
                        <td><p className="cornflower-blue">Quantité</p></td>
                        <td><p className="cornflower-blue">Total</p></td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><p><input style={{maxHeight: 300}} name="description" className="first-item" value="Webdesign et recherche branding"/></p></td>
                        <td><p><input name="prestaire-tauxhoraire" value="600"/>€/jour</p></td>
                        <td><p><input name="prestaire-tauxhoraire" value="4"/></p></td>
                        <td><p><input name="prestaire-tauxhoraire" value="24400"/>€</p></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td><p className="cornflower-blue text-right">Total</p></td>
                        <td><p>24400€<sub>HT</sub></p></td>
                      </tr>
                    </tbody>
                  </table>

                  <textarea
                    className="lynch"
                    name="solution"
                    value="Conseil 1 :Breaking down your service package into 3 or 4 chronological phases (if applicable) will help the client understand what will happen when, as well as make your solution appear valuable. But keep the breakdown at a high level and dont break down your price its crucial your priceis easy to understand."
                   />

                   <textarea
                     className="lynch"
                     name="solution"
                     value="Conseil 2 : Proposez 2, 3 ou 4 offres differentes vous donnera des chances supplementaire de remporter le contrat."
                    />

                  <table className="service">
                    <thead>
                      <tr>
                        <td><p className="cornflower-blue">Service</p></td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p>
                            <ul>
                              <li><strong>Audit of client_name’s current social media use</strong>  – We’ll assess everything you’re doing in social media and use our expertise to offer actionable advice for better results.</li>
                              <li><strong>Development of a social media strategic plan</strong> – We’ll take what we found out in the audit, run it through our analytics system, and create a plan for you to expand your social media presence in the most efficient way.</li>
                              <li><strong>Scoreboard system training</strong> – We’ll meet with client_name’s team and teach you everything you need to know to run our social media scoreboard and interpret the numerical signals.</li>
                            </ul>
                          </p>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><p className="cornflower-blue text-right">Total</p></td>
                        <td><p>4400€<sub>HT</sub></p></td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-center"><strong>Acompte de <span className="cornflower-blue">{this.state.acomptePourcentage}%</span> nécéssaire pour lancer le projet.</strong></p>
                </div>

                {this.state.showComponentServicesAdditionnels &&
                  <div className="container container-proposition">
                     <h2>Services additionnels</h2>
                     <textarea
                       className="lynch"
                       name="servicesAdditionnels"
                       value={this.state.proposition.servicesAdditionnels}
                     />
                  </div>
                }

                {this.state.showComponentPourquoi &&
                  <div className="container container-proposition">
                     <h2>Pourquoi me choisir</h2>
                     <textarea
                       className="lynch"
                       name="pourquoi"
                       value={this.state.proposition.pourquoi}
                     />
                  </div>
                }

                {this.state.showComponentPlanning &&
                  <div className="container container-proposition">
                    <h2>Le plan d'action</h2>
                    <textarea
                      className="lynch"
                      name="planification"
                      value={this.state.proposition.planification}
                    />

                    <table className="planning">
                      <thead>
                        <tr>
                          <td>
                            <p className="cornflower-blue">Phase</p>
                          </td>
                          <td>
                            <p className="cornflower-blue">Activité</p>
                          </td>
                          <td>
                            <p className="cornflower-blue">Achèvement</p>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <p>lorem ispum delarawa</p>
                          </td>
                          <td>
                            <p>lorem ispum delarawa</p>
                          </td>
                          <td>
                            <p>lorem ispum delarawa</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                }

                {this.state.showComponentTemoignages &&
                  <div className="container container-proposition">
                     <h2>Témoignages</h2>
                     <textarea
                       className="lynch"
                       name="temoignages"
                       value={this.state.proposition.temoignages}
                     />
                  </div>
                }

                <div className="container container-proposition">
                  <h2>Note</h2>
                  <textarea
                    useCacheForDOMMeasurements
                    className="lynch"
                    name="note"
                    value={this.state.proposition.note}
                  />
                </div>

                <div className="container container-proposition">
                  <h2>Termes et conditions</h2>
                  <textarea
                    className="lynch"
                    name="conditions"
                    value={this.state.proposition.conditions}
                  />
                </div>

                {this.state.showComponentCTA &&
                  <div className="container container-proposition">
                     <h2 className="text-center">La prochaine étape</h2>
                     <p className="text-center">
                       Laurent M. consultant webmarketing<br/>
                       06.XX.XX.XX.XX, laurentm@monsupersite.com<br/>
                     {this.state.prestataire.adresse}, {this.state.prestataire.cp} {this.state.prestataire.ville}
                     </p>
                  </div>
                }
              </div>
            </section>

          </main>
        </div>
      </div>
    );
  }
}

export default VueProposition;
