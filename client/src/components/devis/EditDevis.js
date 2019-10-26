import React from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import AutosizeInput from 'react-input-autosize';
import DragDropLogo from '../modules/DragDropLogo';
import database from '../../firebase/firebase';
import Aside from '../Aside';

export class EditDevis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      numero: this.props.location.numero,
      date: '',
      dateStatus: '',
      titre: '',
      description: '',
      montantht: '',
      montant: '',
      acompte: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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

  componentDidMount() {
    fetch('/configuration')
      .then(res => res.json())
      .then(res => this.callConfiguration(res))

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

      this.setState({
        numero: numero,
        titre: devis.titre,
        date: devis.date.substring(0, devis.date.indexOf('T')),
        dateSignature: devis.dateSignature,
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangePrestataire = (e) => {
    this.setState({
      prestataire: {
        [e.target.name]: e.target.value
      }
    });
  }

  handleChangeClient = (e) => {
    this.setState({
      client: {
        [e.target.name]: e.target.value
      }
    });
  }

  handleChangeTextArea = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const dataDevis = {}
    const {
      titre = this.state.titre,
      description = this.state.description,
      numero = this.state.numero
    } = dataDevis;
    const devis = { description, numero, titre };
    database.ref(`abonnement/devis/${numero}`).update(devis).then((ref) => {
      console.log(this.state.description)
    });

    const dataConfig = {}
    const {
      prenom = this.state.prestataire.prenom,
      nom = this.state.prestataire.nom
    } = dataConfig;
    const infos = { prenom, nom };
    database.ref(`abonnement/configuration`).update(infos).then((ref) => {
      console.log(this.state)
    });
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="devis-edit">

            <div className="row-fluid">
              <div className="large-10 columns">

                <section className="container transparent">
                  <div className="row-fluid">
                    <div className="large-12 columns">
                      <div className="row-fluid">
                        <div className="large-6 columns">
                          <h1>{this.state.titre}</h1>
                          <p className="numero-facture">{this.state.numero}</p>
                        </div>
                        <div className="large-6 columns">
                          <Link to="/"><button className="align-right">Envoyer</button></Link>
                          <button onClick={this.handleSubmit} className="align-right">Sauvegarder</button>
                          <button className="btn-fifth align-right">Annuler</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="container transparent">
                  <h3 className="prevision-taxes">Taxes à prévoir : 960€</h3>
                </div>

                <div className="container transparent">
                  <section className="container container-devis shadows">
                    <div className="row-fluid row-1">
                      <div className="large-4 columns">
                        <div className="example">
                          {this.state.prestataire.logo !== '' ? <div className="box-logo-devis"><img type="image/svg+xml" className="logo-devis" src={this.state.prestataire.logo} alt=""/></div> : <img type="image/svg+xml" className="logo-devis-empty" src="/images/drag-drop.png" alt=""/>}
                        </div>
                      </div>
                      <div className="large-4 columns">
                        <div className="row">
                          <AutosizeInput
                            name="prenom"
                            style={{display: 'inline-block', marginRight: 3}}
                            value={this.state.prestataire.prenom}
                            onChange={this.handleChangePrestataire}
                            />
                          <AutosizeInput
                            name="nom"
                            style={{display: 'inline-block'}}
                            value={this.state.prestataire.nom}
                            onChange={this.handleChangePrestataire}
                            />
                        </div>
                        <div>
                          <AutosizeInput
                            name="adresse"
                            value={this.state.prestataire.adresse}
                            onChange={this.handleChangePrestataire}
                            />
                        </div>
                        <div className="row">
                          <AutosizeInput
                            name="cp"
                            style={{display: 'inline-block', marginRight: 3}}
                            value={this.state.prestataire.cp}
                            onChange={this.handleChangePrestataire}
                            />
                          <AutosizeInput
                            name="ville"
                            style={{display: 'inline-block'}}
                            value={this.state.prestataire.ville}
                            onChange={this.handleChangePrestataire}
                            />
                        </div>
                        <div className="row">
                          <AutosizeInput
                            name="email"
                            value={this.state.prestataire.email}
                            onChange={this.handleChangePrestataire}
                            />
                        </div>
                        <div className="row">
                          <AutosizeInput
                            name="telephone"
                            value={this.state.prestataire.telephone}
                            onChange={this.handleChangePrestataire}
                            />
                          <AutosizeInput
                            name="siteweb"
                            value={this.state.prestataire.siteweb}
                            onChange={this.handleChangePrestataire}
                            />
                        </div>
                      </div>
                      <div className="large-4 columns" id="large-3-2">
                        <p className="cornflower-blue">Numéro de devis</p>
                        <input value={this.state.numero} />
                        <p className="cornflower-blue">Date d'émission</p>
                        <input value={this.state.date} />
                      </div>
                    </div>
                    <div className="row-fluid row-2">
                      <h2>Devis</h2>
                      <div className="small-3 large-6 columns">
                        <p className="cornflower-blue">Commandé par</p>
                        <div>
                        <AutosizeInput
                          name="entreprise"
                          value={this.state.client.entreprise}
                          onChange={this.handleChangeClient}
                        />
                        </div><div>
                        <AutosizeInput
                          name="nom"
                          value={this.state.client.nom}
                          onChange={this.handleChangeClient}
                        />
                        </div><div>
                        <AutosizeInput
                          name="adresse"
                          value={this.state.client.adresse}
                          onChange={this.handleChangeClient}
                        />
                        </div>
                        <div className="row">
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="cp"
                              value={this.state.client.cp}
                              onChange={this.handleChangeClient}
                              />
                          </div>
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="ville"
                              value={this.state.client.ville}
                              onChange={this.handleChangeClient}
                              />
                          </div>
                        </div>
                      </div>
                      <div className="small-3 large-6 columns">
                        <p className="cornflower-blue">Paiement à</p>
                        <div className="row">
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="prenom"
                              value={this.state.prestataire.prenom}
                              onChange={this.handleChangePrestataire}
                              />
                          </div>
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="nom"
                              value={this.state.prestataire.nom}
                              onChange={this.handleChangePrestataire}
                              />
                          </div>
                        </div>
                        <div>
                        <AutosizeInput
                          name="adresse"
                          value={this.state.prestataire.adresse}
                          onChange={this.handleChangePrestataire}
                        />
                        </div>
                        <div className="row">
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="cp"
                              value={this.state.prestataire.cp}
                              onChange={this.handleChangePrestataire}
                              />
                          </div>
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="ville"
                              value={this.state.prestataire.ville}
                              onChange={this.handleChangePrestataire}
                              />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row-fluid row-3">
                      <div className="small-3 large-7 columns">
                        <p className="cornflower-blue">Description</p>
                        <AutosizeInput
                          name="titre"
                          className="medium"
                          value={this.state.titre}
                          onChange={this.handleChange}
                        />
                        <TextareaAutosize
                          useCacheForDOMMeasurements
                          style={{maxHeight: 300}}
                          name="description"
                          value={this.state.description}
                          onChange={this.handleChangeTextArea}
                        />
                      </div>
                      <div className="small-3 large-2 columns">
                        <p className="cornflower-blue">Tarif horaire</p>
                        <p><AutosizeInput
                          name="prestaire-tauxhoraire"
                          value={this.state.prestataire.tauxhoraire}
                          onChange={this.handleChange}
                          />€/heure</p>
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
                        <img type="image/svg+xml" src="/images/signature-devis.png" alt="" onmousedown="return false" onmousemove="return false"/>
                      </div>
                    </div>
                    <div className="row-fluid row-6">
                      <div className="large-6 columns">
                        <p><strong>Nom du prestataire</strong></p>
                      </div>
                      <div className="large-6 columns">
                        <p><strong>Signature du prestataire</strong></p>
                        <img type="image/svg+xml" src="/images/signature-devis.png" alt="" onmousedown="return false" onmousemove="return false"/>
                      </div>
                    </div>
                  </section>

                  <section className="container container-devis shadows">
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
                </div>
              </div>

              <div className="large-2 columns">
                <h3>Paramètres</h3>
                <p className="lynch s-size">Pour cette facture</p>
                <ul className="menu-edit">
                  <li>
                    <p><strong>Accepter les cartes de crédits</strong><br/>
                    <span>Permettez aux clients de vous payer en ligne</span></p>
                  </li>
                  <li>
                    <p><strong>Personnalisé le style</strong><br/>
                    <span>Changez le template, les couleurs, les typographies</span></p>
                  </li>
                  <li>
                    <p><strong>Envoyer un rappel</strong><br/>
                    <span>À intervales réguliers</span></p>
                  </li>
                </ul>
              </div>

            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default EditDevis;
