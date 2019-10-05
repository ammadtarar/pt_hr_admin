import React from 'react';
import { Link } from 'react-router-dom';
import database from '../../firebase/firebase';
import Aside from '../Aside';
import RIB from './modules/Rib';
import Cheque from './modules/Cheque';

export class VueFacture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paiements: {
        modePaiement: [],
        rib: [],
        cheque: []
      },
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
        adresse: '',
        cp: '',
        ville: '',
        pays: ''
      },
      numero: '',
      date: '',
      delaiPaiment: '',
      datePaiementDu: '',
      titre: '',
      description: '',
      montantht: '',
      status: '',
      backgroundStatus: '',
      dateStatus: ''
    }
  }

  componentDidMount() {
    fetch('/configuration')
      .then(res => res.json())
      .then(res => this.callConfiguration(res))
    // this.callFacture()
    fetch('/factures')
      .then(res => res.json())
      .then(res => this.callFacture(res))
  }

  callConfiguration(res) {
    const paiements = res.paiements
    this.setState({
      prestataire: {
        prenom: res.entreprise.prenom,
        nom: res.entreprise.nom,
        adresse: res.entreprise.adresse,
        cp: res.entreprise.cp,
        ville: res.entreprise.ville,
        pays: res.entreprise.pays,
        telephone: res.entreprise.telephone,
        email: res.entreprise.email,
        siteweb: res.entreprise.siteweb,
        tauxhoraire: res.tauxHoraire
      },
      paiements: {
        modePaiement: {
          stripe: paiements.modePaiement.stripe,
          paypal: paiements.modePaiement.paypal,
          rib: paiements.modePaiement.rib,
          cheque: paiements.modePaiement.cheque
        },
        rib: {
          ready: paiements.rib.ready,
          nomBanque: paiements.rib.nomBanque,
          domiciliation: paiements.rib.domiciliation,
          bic: paiements.rib.bic,
          iban: paiements.rib.iban,
          codeBanque: paiements.rib.rib.codeBanque,
          codeGuichet: paiements.rib.rib.codeGuichet,
          numeroCompte: paiements.rib.rib.numeroCompte,
          cleRIB: paiements.rib.rib.cleRIB
        },
        cheque: {
          ready: paiements.cheque.ready,
          domiciliation: paiements.cheque.domiciliation
        }
      }
    });
  }

  callFacture(res) {
    const numero = this.props.location.numero;
    if (typeof numero !== 'undefined') {
      sessionStorage.setItem('numeroFacture', this.props.location.numero);
    }
    const numeroFacture = sessionStorage.getItem('numeroFacture');
    database.ref(`abonnement/factures/${numeroFacture}`).on('value', (snapshot) => {
      const facture = snapshot.val();

      //Formatage date de paiement prévu
      const date = new Date(facture.date);
      date.setDate(date.getDate() + facture.delaiPaiement);
      const mois = [
        "janvier", "février", "mars",
        "avril", "mai", "juin", "juillet",
        "août", "septembre", "octobre",
        "novembre", "décembre"
      ];
      const datePaiementDu = date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear() + ' (sous ' + facture.delaiPaiement + ' jours)';
      const datePaiementDuStatus = date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear();

      //Formatage date d'émission
      const dateEmission = new Date(facture.date);
      const mm = dateEmission.getMonth() + 1;
      const dateFacturation = dateEmission.getDate() + '-' + mm + '-' + dateEmission.getFullYear();

      var today = new Date();
      var tempsDiff = Math.abs(today.getTime() - dateEmission.getTime());
      var diffJours = Math.ceil(tempsDiff / (1000 * 3600 * 24));

      //Formatage date status
      const dateStatus = new Date(facture.dateStatus);
      const dateDernierStatus = dateStatus.getDate() + ' ' + mois[dateStatus.getMonth()] + ' ' + dateStatus.getFullYear();

      this.setState({
        numero: numero,
        titre: facture.titre,
        dateEmission: facture.date,
        date: dateFacturation,
        datePaiementDu: datePaiementDuStatus,
        delaiPaiement: facture.delaiPaiement,
        joursRestantsPaiement: diffJours - facture.delaiPaiement,
        description: facture.description,
        montantht: facture.montant,
        status: facture.status,
        backgroundStatus: 'container-status-facture ' + facture.status,
        dateStatus: dateDernierStatus,
        client: {
          entreprise: facture.entreprise,
          nom: facture.nom,
          adresse: facture.adresse,
          cp: facture.cp,
          ville: facture.ville
        }
      });
    });
  }

  render() {

    let statusBar;
    if (this.state.status === 'Payée') {
      statusBar = <p><span>{this.state.status}</span> le {this.state.dateStatus}</p>
    } else if (this.state.status === 'Impayée') {
      statusBar = <p><span>{this.state.status}</span>, {this.state.joursRestantsPaiement} jours de retard </p>
    } else if (this.state.status === 'Envoyée') {
      statusBar = <p><span>{this.state.status}</span>, paiement du le {this.state.datePaiementDu} </p>
    } else if (this.state.status === 'Brouillon') {
      statusBar = <p><span>{this.state.status}</span>, crée le {this.state.dateStatus} </p>
    }

    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="facture-vue">

            <section className="container transparent">
              <div className="row-fluid">
                <div className="large-8 columns">
                  <Link to="/factures"><p className="retour">Factures</p></Link>
                </div>
              </div>
            </section>

            <section className="container transparent">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h1>{this.state.titre}</h1>
                  <p className="numero-facture">{this.state.numero}</p>
                </div>
                <div className="large-6 columns">
                  <button onClick={this.openModal} className="align-right">Envoyer</button>
                  <Link to={{pathname: "/factures/edit", numero: this.state.numero}}><button className="align-right">Éditer</button></Link>
                  <Link to="/devis"><button className="btn-fifth align-right">Plus d'options</button></Link>
                  <ul className="menu-options">
                    <li>Ajouter paiement</li>
                    <li>Envoyer par email</li>
                    <li>Créer lien de téléchargement</li>
                    <li>Marqué envoyé</li>
                    <li>Dupliqué</li>
                    <li>Imprimer</li>
                    <li>Télécharger le PDF</li>
                    <li>Archiver</li>
                    <li>Effacer</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={this.state.backgroundStatus}>
              {statusBar}
            </section>

            <section className="container transparent">
              <h3 className="prevision-taxes">Taxes à prévoir : 960€ (24.4%)</h3>
            </section>

            <section className="container container-facture shadows">
              <div className="row-fluid row-1">
                <div className="large-6 columns">
                  <img type="image/svg+xml" src="/images/drag-drop.png" alt=""/>
                </div>
                <div className="large-3 columns" id="large-3-1">
                  <div className="row">
                    <div className="large-6 columns">
                      <p>{this.state.prestataire.prenom}</p>
                    </div>
                    <div className="large-6 columns">
                      <p>{this.state.prestataire.nom}</p>
                    </div>
                  </div>
                  <div>
                    <p>{this.state.prestataire.adresse}</p>
                  </div>
                  <div className="row">
                    <div className="large-6 columns">
                      <p>{this.state.prestataire.cp}</p>
                    </div>
                    <div className="large-6 columns">
                      <p>{this.state.prestataire.ville}</p>
                    </div>
                  </div>
                  <div>
                    <p>{this.state.prestataire.email}</p>
                  </div>
                  <div>
                    <p>{this.state.prestataire.telephone}</p>
                  </div>
                  <div>
                    <p>{this.state.prestataire.siteweb}</p>
                  </div>
                </div>
                <div className="large-3 columns" id="large-3-2">
                  <p className="cornflower-blue">Numéro de facture</p>
                  <input value={this.state.numero} />
                  <p className="cornflower-blue">Date d'émission</p>
                  <input value={this.state.date} />
                  <p className="cornflower-blue">À payer avant le</p>
                  <p>{this.state.datePaiementDu}</p>
                </div>
              </div>
              <div className="row-fluid row-2">
                <h2>Facture</h2>
                <div className="small-3 large-6 columns">
                  <p className="cornflower-blue">Commandé par</p>
                  <div>
                  <p>{this.state.client.entreprise}</p>
               </div>
                <div>
                  <p>{this.state.client.nom}</p>
                </div>
                <div>
                  <p>{this.state.client.adresse}</p>
                </div>
                  <div className="row">
                    <div className="large-6 columns">
                      <p>{this.state.client.cp}</p>
                    </div>
                    <div className="large-6 columns">
                      <p>{this.state.client.ville}</p>
                    </div>
                  </div>
                </div>
                <div className="small-3 large-6 columns">
                  <p className="cornflower-blue">Paiement à</p>
                  <div className="row">
                    <div className="large-6 columns">
                      <p>{this.state.prestataire.prenom}</p>
                    </div>
                    <div className="large-6 columns">
                      <p>{this.state.prestataire.nom}</p>
                    </div>
                  </div>
                  <div>
                    <p>{this.state.prestataire.adresse}</p>
                  </div>
                  <div className="row">
                    <div className="large-6 columns">
                      <p>{this.state.prestataire.cp}</p>
                    </div>
                    <div className="large-6 columns">
                      <p>{this.state.prestataire.ville}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row-fluid row-3">
                <div className="small-3 large-7 columns">
                  <p className="cornflower-blue">Description</p>
                  <p><strong>{this.state.titre}</strong></p>
                  <p>{this.state.description}</p>
                </div>
                <div className="small-3 large-2 columns">
                  <p className="cornflower-blue">Tarif horaire</p>
                  <p>{this.state.prestataire.tauxhoraire}€/heure</p>
                </div>
                <div className="small-3 large-1 columns">
                  <p className="cornflower-blue">Quantité</p>
                  <p>4</p>
                </div>
                <div className="small-3 large-1 columns">
                  <p className="cornflower-blue">Total</p>
                  <p>{this.state.montantht}€</p>
                </div>
              </div>

              <div className="row-fluid row-4">
                <div className="large-11 columns">
                  <p className="text-right"><strong>Total HT</strong></p>
                </div>
                <div className="large-1 columns">
                  <p>{this.state.montantht}€</p>
                </div>
                <div className="large-11 columns">
                  <p className="text-right"><strong>Remise commerciale</strong></p>
                </div>
                <div className="large-1 columns"></div>
                <div className="large-11 columns">
                  <p className="text-right"><strong>TVA 20%</strong></p>
                </div>
                <div className="large-1 columns">
                  <p>20%</p>
                </div>
              </div>

              <div className="row-fluid row-5">
                <div className="large-11 columns">
                  <p className="text-right"><strong>Total</strong></p>
                </div>
                <div className="large-1 columns">
                  <p>{this.state.montantht}€<sub>TTC</sub></p>
                </div>
                <div className="large-11 columns">
                  <p className="text-right"><strong>Montant payé</strong></p>
                </div>
                <div className="large-1 columns">
                  <p>€<sub>TTC</sub></p>
                </div>
              </div>

              <div className="row-fluid row-6">
                <div className="large-11 columns">
                  <p className="text-right eastern-blue"><strong>Montant dù</strong></p>
                </div>
                <div className="large-1 columns">
                  <p>€<sub>TTC</sub></p>
                </div>
              </div>
              <p className="cornflower-blue text-center">Merci</p>
              <p className="text-right iron"><strong>1-2</strong></p>
            </section>

            <section className="container container-facture shadows">
              <p className="cornflower-blue">Termes</p>
              <p>À propos de cette facture :</p>
              <ul>
                <li>La présente facture prévoit l’intégralité des prestations que le prestataire s’engage à réaliser pour le Client.</li>
                <li>Toute prestation supplémentaire demandée par le Client donnera lieu à l'émission d’un nouveau devis ou avenant.</li>
              </ul>
              <br/>
              <p>En conformité de l’article L 441-6 du Code de commerce :</p>
              <ul>
                <li>La facture émise sera payable sous 45 jours.</li>
                <li>Tout règlement effectué après expiration de ce délai donnera lieu, à titre de pénalité de retard, à l’application d’un intérêt égal à celui appliqué par la Banque Centrale Européenne à son opération de refinancement la plus récente, majoré de 10 points de pourcentage, ainsi qu'à une indemnité forfaitaire pour frais de recouvrement d'un montant de 40 Euros.</li>
                <li>Les pénalités de retard sont exigibles sans qu’un rappel soit nécessaire.</li>
              </ul>
              <br/>

              <div className="box-mode-paiements">
                <RIB data={this.state.paiements.rib}/>
                <Cheque data={this.state.paiements.cheque}/>
              </div>
              <p className="text-right iron"><strong>2-2</strong></p>
            </section>

          </main>
        </div>
      </div>
    );
  }
}

export default VueFacture;
