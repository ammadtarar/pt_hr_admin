import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import database from '../../firebase/firebase';
import Aside from '../Aside';

export class SignatureDevis extends React.Component {
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
        prenom: '',
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
      acompte: ''
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount() {
    database.ref('abonnement').on('value', (snapshot) => {
      const val = snapshot.val();
      const signatureIDPresta = 'CF8418EB4342315A75AF4A5A5'.substring(0,15) + '...';

      this.setState({
        prestataire: {
          signatureID: signatureIDPresta,
          prenom: val.configuration.prenom,
          nom: val.configuration.nom,
          adresse: val.configuration.adresse,
          cp: val.configuration.cp,
          ville: val.configuration.ville,
          pays: val.configuration.pays,
          telephone: val.configuration.entreprise.telephone,
          email: val.configuration.entreprise.email,
          siteweb: val.configuration.entreprise.siteweb
        }
      });
    });

    const numero = '20180915-80';
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
      const paraphe = devis.prenom.charAt(0) + devis.nom.charAt(0);
      const signatureID = 'DD38418EB99915A75AF4A5A5'.substring(0,15) + '...';

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
          signatureID: signatureID,
          paraphe: paraphe,
          entreprise: devis.entreprise,
          nom: devis.nom,
          prenom: devis.prenom,
          adresse: devis.adresse,
          cp: devis.cp,
          ville: devis.ville
        }
      });
    });
  }

  render() {
    const defaultMessage = 'Je suis excité de travailler avec vous et suis dans l attente de votre réponse. S il vous plâit, contactez-moi à contact/julienlucas.com pour toutes questions. Bien à vous, Julien';
    let logo;
    database.ref(`abonnement/configuration/entreprise/logo/upload/dataURL`).on('value', (snapshot) => {
      const val = snapshot.val();
      sessionStorage.setItem('logo', JSON.stringify(val));
      const dataURL = JSON.parse(sessionStorage.getItem('logo'));
      if (snapshot.exists()) {
        logo = <img type="image/svg+xml" className="logo-devis" src={dataURL} alt=""/>
      } else {
        logo = <img type="image/svg+xml" className="logo-devis" src="/images/drag-drop.png" alt=""/>
      }
    });

    const wrapperStyle = {
      position: 'absolute',
      width: '100%',
      zIndex: '5'
    };

    return (
      <div>
        <Aside/>
        <div className="wrapper" style={wrapperStyle}>
          <main className="lien-devis-vue">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-5 columns">
                  <h1>{this.state.titre}</h1>
                  <p className="numero-facture">DEVIS N°{this.state.numero}</p>
                </div>
                <div className="large-7 columns">
                  <button className="align-right">Signer le devis</button>
                  <Link to="/devis"><button className="btn-fourth align-right">Télécharger le devis</button></Link>
                </div>
              </div>
            </section>

            <section className={'section-2 ' + this.state.backgroundStatus}>
              <p><span>{this.state.status}</span> le {this.state.dateStatus}</p>
            </section>

            <section className="section-3 container container-devis shadows">
              <div className="row-fluid row-1">
                <div className="large-6 columns">
                  <p className="enveloppe-id">Freelance App - Enveloppe ID 766D3A6F-DD38-418E-B999-15A75AF4A5A5</p>
                  {logo}
                </div>
                <div className="large-3 columns">
                  <p>{this.state.prestataire.prenom} {this.state.prestataire.nom}</p>
                  <p>{this.state.prestataire.adresse}</p>
                  <p>{this.state.prestataire.cp}, {this.state.prestataire.ville}</p>
                  <p>{this.state.prestataire.email}</p>
                  <p>{this.state.prestataire.telephone}</p>
                  <p>{this.state.prestataire.siteweb}</p>
                </div>
                <div className="large-3 columns">
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
                  <p>
                    50€/heure
                  </p>
                </div>
                <div className="small-3 large-1 columns">
                  <p className="cornflower-blue">Quantité</p>
                    <p>
                      4
                    </p>
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

              <div className="row-fluid row-6" id="section-signature">
                <div className="large-6 columns">
                  <p><strong>Nom complet du client</strong></p>
                  <p>{this.state.client.prenom + ' ' + this.state.client.nom}</p>
                </div>
                <div className="large-6 columns">
                  <p><strong>Signature du client</strong></p>
                  <div className="box-signature" onClick={this.openModal}>Signer</div>
                </div>
              </div>
              <div className="row-fluid row-6">
                <div className="large-6 columns">
                  <p><strong>Nom complet du prestataire</strong></p>
                  <p>{this.state.prestataire.prenom + ' ' + this.state.prestataire.nom}</p>
                </div>
                <div className="large-6 columns">
                  <p><strong>Signature du prestataire</strong></p>
                  <div className="box-signature-prestataire">
                    <p className="signature">{this.state.prestataire.prenom + ' ' + this.state.prestataire.nom}</p>
                    <p className="signature-id">{this.state.prestataire.signatureID}</p>
                  </div>
                </div>
              </div>
              <p className="text-right iron"><strong>1-2</strong></p>
            </section>

            <section className="section-4 container container-paper container-devis shadows">
              <p className="cornflower-blue">À propos de ce devis :</p>
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

            <section className="section-5 container transparent">
              <div className="">
                <img type="image/svg+xml" className="logo" src="/images/logo.png" alt=""/>
                <p className="s-size lynch text-center">L'application pour automatiser la gestion de votre entreprise freelance.</p>
              </div>
            </section>
          </main>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Modal Devis"
            overlayClassName="Overlay"
            class="modal"
            style={{content: {top: '50%',transform: 'translateY(-50%)',borderRadius: '.6rem',padding: '2rem 0 0 0',border: '0px solid #e6eaec'}}}>

            <h2 className="text-center cornflower-blue">Signature du devis</h2>
            <hr/>
            <div className="box-popup-content">
              <p className="description text-center">Confirmez votre nom complet, votre paraphe, et cliquer sur signer.</p>
              <form id="send-contrat-form">
                <div className="row-fluid">
                  <div className="large-6 columns">
                    <label>Nom complet<sup>*</sup></label>
                    <input
                      type="text"
                      name="nom"
                      onChange={(event) => this.handleUserInput(event)}
                      placeholder={this.state.client.prenom + ' ' + this.state.client.nom}
                    />
                  </div>
                  <div className="large-6 columns">
                    <label>Paraphe<sup>*</sup></label>
                    <input
                      type="text"
                      name="paraphe"
                      onChange={(event) => this.handleUserInput(event)}
                      placeholder={this.state.client.paraphe}
                    />
                  </div>
                </div>
                <label>Aperçu</label>
                <div className="box-signature">
                  <div className="row-fluid">
                    <div className="large-6 columns">
                      <p className="signature">{this.state.client.prenom + ' ' + this.state.client.nom}</p>
                      <p className="signature-id">{this.state.client.signatureID}</p>
                    </div>
                    <div className="large-6 columns">
                      <p className="signature signature-paraphe">{this.state.client.paraphe}</p>
                      <p className="signature-id signature-id-paraphe"></p>
                    </div>
                  </div>
                </div>
                <input type="submit" className="btn align-right" value="Signer"/>
                <button className="btn-fifth align-right" onClick={this.closeModal}>Annuler</button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default SignatureDevis;
