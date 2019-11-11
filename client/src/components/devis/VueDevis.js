import React from 'react';
import { Link } from 'react-router-dom';
import database from '../../firebase/firebase';
import ModalEnvoie from './ModalEnvoieDevis';
import Modal from 'react-modal';
import Aside from '../Aside';
import printPDF from '../../jspdf/print/jspdf-devis';

export class VueDevis extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      prestataire: {
        prenom: '',
        nom: '',
        adresse: '',
        ville: '',
        cp: '',
        pays: '',
        telephone: '',
        email: '',
        siteweb: ''
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
      status: '',
      dateStatus: '',
      titre: '',
      description: '',
      montantht: '',
      montant: '',
      acompte: '',
      printDevis: {
          'addressSender': {
              'person':'Julien Lucas',
              'street':'10 Impase Pierre Piquet',
              'city':'84140 MONTFAVET',
              'email':'contact@julienlucas.com',
              'phone':'06 76 75 07 19'
          },
          'address': {
              'company':'Quanta',
              'person':'Roberto Santaolala',
              'street':'123 rue pignon sur rue',
              'city':'75000 PARIS',
          },
          'personalInfo': {
              'compagny':'Julien Lucas',
              'siret':'79439712500012',
              'website': 'https://julienlucas.com',
              'tva': 'FR 14 538386699',
              'statut': 'AE',
              'bank': {
                  'person':'Julien Lucas',
                  'name':'Boursorama',
                  'IBAN':'DE12 3456 7890 1234 5678 90'
              }
          },
          'infosInvoice': {
            'invoicenumber':'Numéro de devis',
            'number':'20181104-93',
            'dateLabel':'Date d émission',
            'date':'28-06-2019',
            'empty':''
          },
          'label': {
              'invoice':'Devis',
              'tableItems':'Description',
              'tableTarif':'Tarif',
              'tableQty':'Quantité',
              'tableSingleTotal':'Total',
              'totalht':'Total HT',
              'remise':'Remise commerciale',
              'tva':'TVA',
              'totalGrand':'Total',
              'statutAE': 'Statut auto entrepreneur, TVA non applicable, article 293B du Code Général des Impôts',
              'contact':'Contactdetails:',
              'bank':'Bankaccount:',
              'taxinfo':'Taxnumber:',
          },
          'invoice': {
              'acomptePourcent':'30%',
              'acompte':'2.017,12 €',
              'total':'6.724,00 €',
              'totalht':'4.700,00 €',
              'remise':'',
              'tva':'20%',
              'text':'• La présente facture prévoit l’intégralité des prestations que le prestataire s’engage à réaliser pour le Client.\n' +
              '• Toute prestation supplémentaire demandée par le Client donnera lieu à l émission d’un nouveau devis ou avenant.\n' +
              '\n' +
              'En conformité de l’article L 441-6 du Code de commerce :\n' +
              '• La facture émise sera payable sous 45 jours.\n' +
              '• Tout règlement effectué après expiration de ce délai donnera lieu, à titre de pénalité de retard, à l’application d’un intérêt égal à celui appliqué par la Banque Centrale Européenne à son opération de refinancement la plus récente, majoré de 10 points de pourcentage, ainsi qu à une indemnité forfaitaire pour frais de recouvrement d un montant de 40 Euros.\n' +
              '• Les pénalités de retard sont exigibles sans qu’un rappel soit nécessaire.'
          },
          'signatures': {
              'nomClientLabel':'Nom du client',
              'nomSenderLabel':'Nom du prestataire',
              'nomClient':'Roberto Santaolala',
              'nomSender':'Julien Lucas',
              'signatureClientLabel':'Signature du client',
              'signatureSenderLabel':'Signature du prestataire',
              'signatureClient':'',
              'SignatureSender':''
          },
          'items': {
              [0]: {
                  'title':'Templating',
                  'description':'predefined custom specialities for vague usage in a framework. Sense a light case weight value for exisiting solution services. Provide a case for universal properties.',
                  'tarif':'500€/jour',
                  'qty':'5.5',
                  'total':'2.400,00 €'
              },
              [1]: {
                  'title':'Design',
                  'description':'outwork digital screen UX in different cases for utilities',
                  'tarif':'',
                  'qty':'0.5',
                  'total':'438,00 €'
              },
              [2]: {
                  'title':'Security',
                  'description':'develop a 100% secure workflow mechanism by shutting down your PC',
                  'tarif':'',
                  'qty':'1',
                  'total':'12,00 €'
              },
              [3]: {
                  'title':'Capability Training Closure Business Rules Appliance Regulatory',
                  'description':'setup your skill mentoring for future reference & allow $ signs to getUsed `because` this should get covered too. Let me just explain not why ß.',
                  'tarif':'',
                  'qty':'2',
                  'total':'512,00 €'
              },
              [4]: {
                  'title':'Templating',
                  'description':'predefined custom specialities for vague usage in a framework. Sense a light case weight value for exisiting solution services. Provide a case for universal properties.',
                  'tarif':'',
                  'qty':'2',
                  'total':'2.400,00 €'
              },
              [5]: {
                  'title':'Design',
                  'description':'outwork digital screen UX in different cases for utilities',
                  'tarif':'',
                  'qty':'0.5',
                  'total':'438,00 €'
              },
              [6]: {
                  'title':'Security',
                  'description':'develop a 100% secure workflow mechanism by shutting down your PC',
                  'tarif':'',
                  'qty':'1',
                  'total':'12,00 €'
              },
              [7]: {
                  'title':'Capability Training Closure Business Rules Appliance Regulatory',
                  'description':'setup your skill mentoring for future reference & allow $ signs to getUsed `because` this should get covered too. Let me just explain not why ß.',
                  'tarif':'',
                  'qty':'2',
                  'total':'512,00 €'
              },
              [8]: {
                  'title':'Capability Training Closure Business Rules Appliance Regulatory',
                  'description':'setup your skill mentoring for future reference & allow $ signs to getUsed `because` this should get covered too. Let me just explain not why ß.',
                  'tarif':'',
                  'qty':'2',
                  'total':'512,00 €'
              }
          }
      }
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount() {
    fetch('/configuration')
      .then(res => res.json())
      .then(res => this.callConfiguration(res))
    this.callDevis()
  }

  callConfiguration(res) {
    this.setState({
      prestataire: {
        prenom: res.prenom,
        nom: res.nom,
        adresse: res.entreprise.rue,
        cp: res.entreprise.cp,
        ville: res.entreprise.ville,
        pays: res.entreprise.pays,
        telephone: res.entreprise.telephone,
        email: res.entreprise.email,
        siteweb: res.entreprise.siteweb,
        logo: res.entreprise.logo
      }
    });
  }

  callDevis() {
    const numero = this.props.location.numero;
    if (typeof numero !== 'undefined') {
      sessionStorage.setItem('numeroDevis', this.props.location.numero);
    }
    const numeroDevis = sessionStorage.getItem('numeroDevis');

    database.ref(`abonnement/devis/${numeroDevis}`).on('value', (snapshot) => {
      const devis = snapshot.val();
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
        date: devis.date.substring(0, devis.date.indexOf('T')),
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
          adresse: devis.adresse,
          cp: devis.cp,
          ville: devis.ville
        }
      });
    });
  }

  downloadDevis() {
    printPDF(this.state.printDevis);
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="devis-vue">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-5 columns">
                  <Link to="/devis"><p className="retour">Devis</p></Link>
                  <h1>{this.state.titre}</h1>
                  <p className="numero-facture">{this.state.numero}</p>
                </div>
                <div className="large-7 columns">
                  <button onClick={this.openModal} className="align-right">Envoyer pour signature</button>
                  <Link to={{pathname: "/devis/edit", numero: this.state.numero}}><button className="align-right">Éditer</button></Link>
                  <button className="btn-fourth align-right" onClick={() => this.downloadDevis()}>Télécharger le devis</button>
                </div>
              </div>
            </section>

            <section className={this.state.backgroundStatus}>
              <p><span>{this.state.status}</span> le {this.state.dateStatus}</p>
            </section>

            <section className="container transparent">
              <h3 className="prevision-taxes">Taxes à prévoir : 960€ (24.4%)</h3>
            </section>

            <section className="container container-devis shadows">
              <div className="row-fluid row-1">
                <div className="large-4 columns">
                  {this.state.prestataire.logo !== '' ? <div className="box-logo-devis"><img type="image/svg+xml" className="logo-devis" src={this.state.prestataire.logo} alt=""/></div> : <img type="image/svg+xml" className="logo-devis-empty" src="/images/drag-drop.png" alt=""/>}
                </div>
                <div className="large-4 columns">
                  <p>{this.state.prestataire.prenom} {this.state.prestataire.nom}</p>
                  <p>{this.state.prestataire.adresse}</p>
                  <p>{this.state.prestataire.cp}, {this.state.prestataire.ville}</p>
                  <p>{this.state.prestataire.email}</p>
                  <p>{this.state.prestataire.telephone}</p>
                  <p>{this.state.prestataire.siteweb}</p>
                </div>
                <div className="large-4 columns">
                  <p className="cornflower-blue">Numéro de devis</p>
                  <p>{this.state.numero}</p>
                  <p className="cornflower-blue">Date d'émission</p>
                  <p>{this.state.date}</p>
                </div>
              </div>
              <div className="row-fluid row-2">
                <h2>Devis</h2>
                <div className="small-3 large-6 columns">
                  <p className="cornflower-blue">Commandé par</p>
                  <p>{this.state.client.entreprise}</p>
                  <p>{this.state.client.nom}</p>
                  <p>{this.state.client.adresse}</p>
                  <p>{this.state.client.cp}, {this.state.client.ville}</p>
                </div>
                <div className="small-3 large-6 columns">
                  <p className="cornflower-blue">Paiement à</p>
                  <p>{this.state.prestataire.prenom} {this.state.prestataire.nom}</p>
                  <p>{this.state.prestataire.adresse}</p>
                  <p>{this.state.prestataire.cp}, {this.state.prestataire.ville}</p>
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
                  <p>50€/heure</p>
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
                  <p>{this.state.montant}€<sub>TTC</sub></p>
                </div>
                <div className="large-4 columns">
                  <p className="text-right s-size">Statut auto entrepreneur, TVA non applicable, article 293B du Code Général des Impôts</p>
                </div>
              </div>

              <div className="row-7">
                <p className="text-center"><strong>Acompte de {this.state.acomptePourcentage}% nécéssaire pour lancer le projet, soit : {this.state.acompte}€<sub>TTC</sub></strong></p>
              </div>

              <div className="row-fluid row-6">
                <div className="large-6 columns">
                  <p><strong>Nom du client</strong></p>
                </div>
                <div className="large-6 columns">
                  <p><strong>Signature du client</strong></p>
                  <img type="image/svg+xml" src="/images/signature-devis.png" alt=""/>
                </div>
              </div>
              <div className="row-fluid row-6">
                <div className="large-6 columns">
                  <p><strong>Nom du prestataire</strong></p>
                </div>
                <div className="large-6 columns">
                  <p><strong>Signature du prestataire</strong></p>
                  <img type="image/svg+xml" src="/images/signature-devis.png" alt=""/>
                </div>
              </div>
              <p className="text-right iron"><strong>1-2</strong></p>
            </section>

            <section className="container container-paper container-devis shadows">
              <p className="cornflower-blue">Termes</p>
              <p>À propos de ce devis :</p>
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

              <p className="text-right iron"><strong>2-2</strong></p>
            </section>
          </main>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="overlay-modal"
          >
            <ModalEnvoie/>
          </Modal>
        </div>
      </div>
    );
  }
}

export default VueDevis;
