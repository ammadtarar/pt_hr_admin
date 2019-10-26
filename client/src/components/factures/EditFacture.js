import React from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import AutosizeInput from 'react-input-autosize';
import database from '../../firebase/firebase';
import Aside from '../Aside';
import RIB from './modules/Rib';
import Cheque from './modules/Cheque';

export class EditFacture extends React.Component {
  constructor() {
    super();
    this.state = {
      paiements: {
        modePaiement: [],
        rib: [],
        cheque: []
      },
      prestataire: {
        prenom: '',
        nom: '',
        rue: '',
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
      montantht: ''
    }
  }

  callConfiguration(res) {
    const signatureIDPresta = 'CF8418EB4342315A75AF4A5A5'.substring(0,15) + '...';
    this.setState({
      prestataire: {
        signatureID: signatureIDPresta,
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
      },
      paiements: {
        modePaiement: {
          stripe: res.paiements.modePaiement.stripe,
          paypal: res.paiements.modePaiement.paypal,
          rib: res.paiements.modePaiement.rib,
          cheque: res.paiements.modePaiement.cheque
        },
        rib: {
          ready: res.paiements.rib.ready,
          nomBanque: res.paiements.rib.nomBanque,
          domiciliation: res.paiements.rib.domiciliation,
          bic: res.paiements.rib.bic,
          iban: res.paiements.rib.iban,
          codeBanque: res.paiements.rib.rib.codeBanque,
          codeGuichet: res.paiements.rib.rib.codeGuichet,
          numeroCompte: res.paiements.rib.rib.numeroCompte,
          cleRIB: res.paiements.rib.rib.cleRIB
        },
        cheque: {
          ready: res.paiements.cheque.ready,
          domiciliation: res.paiements.cheque.domiciliation
        }
      }
    });
  }

  componentDidMount() {
    fetch('/configuration')
      .then(res => res.json())
      .then(res => this.callConfiguration(res))

    const numero = this.props.location.numero;
    if (typeof numero !== 'undefined') {
      sessionStorage.setItem('numeroFacture', this.props.location.numero);
    }
    const numeroFacture = sessionStorage.getItem('numeroFacture');
    database.ref(`abonnement/factures/${numeroFacture}`).on('value', (snapshot) => {
      const facture = snapshot.val();
      //Date paiement prévu
      const date = new Date(facture.date);
      date.setDate(date.getDate() + facture.delaiPaiement);
      const mois = [
        "janvier", "février", "mars",
        "avril", "mai", "juin", "juillet",
        "août", "septembre", "octobre",
        "novembre", "décembre"
      ];
      const datePaiementDu = date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear() + ' (sous ' + facture.delaiPaiement + ' jours)';

      //Formatage date d'émission
      const dateEmission = new Date(facture.date);
      const dateFacturation = dateEmission.getDate() + '/' + dateEmission.getMonth() + '/' + dateEmission.getFullYear();

      this.setState({
        acompte1montant: facture.acompte1montant,
        acompte1Date: facture.acompte1date,
        acompte1Numero: facture.acompte1numero,
        numero: numero,
        titre: facture.titre,
        date: dateFacturation,
        datePaiementDu: datePaiementDu,
        description: facture.description,
        montantht: facture.montant,
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
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="facture-edit">

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
                          <Link to="/"><button className="align-right">Sauvegarder</button></Link>
                          <Link to="/factures"><button className="btn-fifth align-right">Annuler</button></Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                <div className="container transparent">
                  <h3 className="prevision-taxes">Taxes à prévoir : 960€</h3>
                </div>

                <div className="container transparent">
                  <section className="container container-facture shadows">
                    <div className="row-fluid row-1">
                      <div className="large-4 columns">
                        {this.state.prestataire.logo !== '' ? <div className="box-logo-devis"><img type="image/svg+xml" className="logo-devis" src={this.state.prestataire.logo} alt=""/></div> : <img type="image/svg+xml" className="logo-devis-empty" src="/images/drag-drop.png" alt=""/>}
                      </div>
                      <div className="large-4 columns" id="large-3-1">
                        <div className="row">
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="prestataire-prenom"
                              value={this.state.prestataire.prenom}
                              onChange={function(event) {
                                 this.setState({value: event.target.value});
                              }}
                              />
                          </div>
                          <div className="large-4 columns">
                            <AutosizeInput
                              name="prestataire-nom"
                              value={this.state.prestataire.nom}
                              onChange={function(event) {
                                 this.setState({value: event.target.value});
                              }}
                              />
                          </div>
                        </div>
                        <div>
                          <AutosizeInput
                            name="prestataire-nom"
                            value={this.state.prestataire.adresse}
                            onChange={function(event) {
                               this.setState({value: event.target.value});
                            }}
                            />
                        </div>
                        <div className="row">
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="prestataire-cp"
                              value={this.state.prestataire.cp}
                              onChange={function(event) {
                                 this.setState({value: event.target.value});
                              }}
                              />
                          </div>
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="prestataire-ville"
                              value={this.state.prestataire.ville}
                              onChange={function(event) {
                                 this.setState({value: event.target.value});
                              }}
                              />
                          </div>
                        </div>
                        <div>
                          <AutosizeInput
                            name="prestataire-email"
                            value={this.state.prestataire.email}
                            onChange={function(event) {
                               this.setState({value: event.target.value});
                            }}
                            />
                        </div>
                        <div>
                          <AutosizeInput
                            name="prestataire-telephone"
                            value={this.state.prestataire.telephone}
                            onChange={function(event) {
                               this.setState({value: event.target.value});
                            }}
                            />
                        </div>
                        <div>
                          <AutosizeInput
                            name="prestataire-siteweb"
                            value={this.state.prestataire.siteweb}
                            onChange={function(event) {
                               this.setState({value: event.target.value});
                            }}
                            />
                        </div>
                      </div>
                      <div className="large-3 columns" id="large-3-2">
                        <p className="cornflower-blue">Numéro de facture</p>
                        <input value={this.state.numero} />
                        <p className="cornflower-blue">Date d'émission</p>
                        <input value={this.state.date} />
                        <p className="cornflower-blue">À payer avant le</p>
                        <TextareaAutosize
                          useCacheForDOMMeasurements
                          style={{maxHeight: 300}}
                          value={this.state.datePaiementDu}
                          onChange={function(event) {
                             this.setState({value: event.target.value});
                          }}
                        />
                      </div>
                    </div>
                    <div className="row-fluid row-2">
                      <h2>Facture</h2>
                      <div className="small-3 large-6 columns">
                        <p className="cornflower-blue">Commandé par</p>
                        <div>
                        <AutosizeInput
                          name="client-entreprise"
                          value={this.state.client.entreprise}
                          onChange={function(event) {
                             this.setState({value: event.target.value});
                          }}
                        />
                        </div><div>
                        <AutosizeInput
                          name="client-nom"
                          value={this.state.client.nom}
                          onChange={function(event) {
                             this.setState({value: event.target.value});
                          }}
                        />
                        </div><div>
                        <AutosizeInput
                          name="client-adresse"
                          value={this.state.client.adresse}
                          onChange={function(event) {
                             this.setState({value: event.target.value});
                          }}
                        />
                        </div>
                        <div className="row">
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="client-cp"
                              value={this.state.client.cp}
                              onChange={function(event) {
                                 this.setState({value: event.target.value});
                              }}
                              />
                          </div>
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="client-ville"
                              value={this.state.client.ville}
                              onChange={function(event) {
                                 this.setState({value: event.target.value});
                              }}
                              />
                          </div>
                        </div>
                      </div>
                      <div className="small-3 large-6 columns">
                        <p className="cornflower-blue">Paiement à</p>
                        <div className="row">
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="prestaire-adresse"
                              value={this.state.prestataire.prenom}
                              onChange={function(event) {
                                 this.setState({value: event.target.value});
                              }}
                              />
                          </div>
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="prestaire-nom"
                              value={this.state.prestataire.nom}
                              onChange={function(event) {
                                 this.setState({value: event.target.value});
                              }}
                              />
                          </div>
                        </div>
                        <div>
                        <AutosizeInput
                          name="form-field-name"
                          value={this.state.prestataire.adresse}
                          onChange={function(event) {
                             this.setState({value: event.target.value});
                          }}
                        />
                        </div>
                        <div className="row">
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="prestaire-adresse"
                              value={this.state.prestataire.cp}
                              onChange={function(event) {
                                 this.setState({value: event.target.value});
                              }}
                              />
                          </div>
                          <div className="large-6 columns">
                            <AutosizeInput
                              name="prestaire-nom"
                              value={this.state.prestataire.ville}
                              onChange={function(event) {
                                 this.setState({value: event.target.value});
                              }}
                              />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row-fluid row-3">
                      <div className="small-3 large-7 columns">
                        <p className="cornflower-blue">Description</p>
                        <p><strong>{this.state.titre}</strong></p>
                        <TextareaAutosize
                          useCacheForDOMMeasurements
                          style={{maxHeight: 300}}
                          value={this.state.description}
                          onChange={function(event) {
                             this.setState({value: event.target.value});
                          }}
                        />
                      </div>
                      <div className="small-3 large-2 columns">
                        <p className="cornflower-blue">Tarif horaire</p>
                        <p><AutosizeInput
                          name="prestaire-tauxhoraire"
                          value={this.state.prestataire.tauxhoraire}
                          onChange={function(event) {
                             this.setState({value: event.target.value});
                          }}
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
                        <p>{this.state.montantht}€<sub>TTC</sub></p>
                      </div>
                    </div>
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

export default EditFacture;
