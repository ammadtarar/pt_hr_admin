import React from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import AutosizeInput from 'react-input-autosize';
import database from '../../firebase/firebase';
import Aside from '../Aside';
import printPDF from '../../jspdf/print/jspdf-proposition';

export class EditProposition extends React.Component {
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
      dateSignature: '',
      titre: '',
      description: '',
      montantht: '',
      montant: '',
      acompte: '',
      proposition: {
        probleme: 'Entrez un aperçu du projet et un résumé de ses objectifs',
        solution: 'Entrez les détails de la planification de votre projet, parlez de votre offre globale, définissez les objectifs à atteindre.',
        planification: 'Entrez les détails de la planification de votre projet',
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

      this.setState({
        numero: numero,
        titre: devis.titre,
        date: devis.date,
        dateSignature: devis.dateSignature,
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeTextArea = (e) => {
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

  handleSubmit(e) {
    e.preventDefault();
  }

  downloadProposition() {
    printPDF(this.state.printProposition);
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="proposition-edit">

            <section className="container transparent">
              <div className="row-fluid">
                <div className="large-9 columns">
                  <div className="row-fluid">
                    <div className="large-6 columns">
                      <h1>{this.state.titre}</h1>
                    </div>
                    <div className="large-6 columns">
                      <Link to="/"><button className="align-right" onClick={() => this.downloadProposition()}>Télécharger PDF</button></Link>
                      <button onClick={this.handleSubmit} className="align-right">Sauvegarder</button>
                      <Link to="/devis"><button className="btn-fifth align-right">Retour</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="container transparent">
              <div className="row-fluid">
                <div className="large-9 columns container-editable borders shadows">

                  <div className="container container-cover container-proposition">
                    <div className="cover-proposition">
                      <h2>Proposition développement web</h2>
                      <p>{this.state.titre}</p>
                    </div>
                  </div>

                  <div className="container container-proposition">
                    <div className="row-fluid">
                      <div className="large-6 columns">
                        <p className="eastern-blue">Préparé par</p>
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
                        <div className="row">
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
                            name="cp"
                            value={this.state.prestataire.email}
                            onChange={this.handleChangePrestataire}
                            />
                        </div>
                        <div className="row">
                          <AutosizeInput
                            name="ville"
                            value={this.state.prestataire.siteweb}
                            onChange={this.handleChangePrestataire}
                            />
                        </div>
                      </div>
                      <div className="large-6 columns">
                        <p className="eastern-blue">Préparé pour</p>
                        <div className="row">
                          <AutosizeInput
                            name="entreprise"
                            value={this.state.client.entreprise}
                            onChange={this.handleChangeClient}
                          />
                        </div>
                        <div className="row">
                          <AutosizeInput
                            name="prenom"
                            style={{display: 'inline-block', marginRight: 3}}
                            value={this.state.client.prenom}
                            onChange={this.handleChangeClient}
                          />
                          <AutosizeInput
                            name="nom"
                            style={{display: 'inline-block'}}
                            value={this.state.client.nom}
                            onChange={this.handleChangeClient}
                          />
                        </div>
                        <div className="row">
                          <AutosizeInput
                            name="adresse"
                            value={this.state.client.adresse}
                            onChange={this.handleChangeClient}
                          />
                        </div>
                        <div className="row">
                          <AutosizeInput
                            name="cp"
                            style={{display: 'inline-block', marginRight: 3}}
                            value={this.state.client.cp}
                            onChange={this.handleChangeClient}
                          />
                          <AutosizeInput
                            name="ville"
                            style={{display: 'inline-block'}}
                            value={this.state.client.ville}
                            onChange={this.handleChangeClient}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {this.state.showComponentProbleme &&
                    <div className="container container-proposition">
                      <p
                        className="garbage"
                        onClick={() => this.setState({showComponentProbleme: false})}
                       />
                      <h2>Problèmes actuels ou la douleur</h2>
                      <TextareaAutosize
                        useCacheForDOMMeasurements
                        className="lynch"
                        name="probleme"
                        value={this.state.proposition.probleme}
                        onChange={this.handleChangeTextArea}
                       />
                    </div>
                  }

                  {this.state.showComponentSolution &&
                    <div className="container container-proposition">
                      <p
                        className="garbage"
                        onClick={() => this.setState({showComponentSolution: false})}
                       />
                      <h2>Solution</h2>
                      <TextareaAutosize
                        useCacheForDOMMeasurements
                        className="lynch"
                        name="solution"
                        value={this.state.proposition.solution}
                        onChange={this.handleChangeTextArea}
                       />
                    </div>
                  }

                  {this.state.showComponentPlanning &&
                    <div className="container container-proposition">
                      <p
                        className="garbage"
                        onClick={() => this.setState({showComponentPlanning: false})}
                       />
                       <h2>Le plan d'action</h2>
                       <TextareaAutosize
                         useCacheForDOMMeasurements
                         className="lynch"
                         name="planification"
                         value={this.state.proposition.planification}
                         onChange={this.handleChangeTextArea}
                       />
                    </div>
                  }

                  <div className="container container-proposition container-offres">
                    <p className="garbage"/>
                    <h2 className="text-center">Selectionnez la structure de l’offre</h2>
                    <div className="row-fluid">
                      <div className="large-4 columns">
                        <div className="box-offre">
                          <h4 className="text-center">Une seule option</h4>
                        </div>
                      </div>
                      <div className="large-4 columns">
                        <div className="box-offre">
                          <h4 className="text-center">Packages</h4>
                        </div>
                      </div>
                      <div className="large-4 columns">
                        <div className="box-offre">
                          <h4 className="text-center">Multi-select</h4>
                        </div>
                      </div>
                    </div>

                    <div className="row-fluid">
                      <input
                        style={{fontSize: 24, backgroundColor: '#eeebfa', borderRadius: 0, marginTop: 20}}
                        name="package"
                        value="New option"
                        onChange={this.handleChange}
                      />
                      <TextareaAutosize
                        useCacheForDOMMeasurements
                        className="lynch"
                        name="description"
                        value="Lorem ipsum dolor sit amet, ea eum solum pertinax evertitur, vocent saperet denique eu vim, adhuc nullam doming ut sed. Posidonium argumentum ut nec, usu et ubique oblique suavitate."
                        onChange={this.handleChangeTextArea}
                      />
                      <div className="package-item">
                        <div className="large-7 columns">
                          <p className="eastern-blue">Description</p>
                          <input
                            style={{maxHeight: 300}}
                            name="description"
                            className="first-item"
                            value="Webdesign et recherche branding"
                            onChange={this.handleChangeTextArea}
                          />
                        </div>
                        <div className="large-2 columns">
                          <p className="eastern-blue">Tarif horaire</p>
                          <p><AutosizeInput
                            name="prestaire-tauxhoraire"
                            value={this.state.prestataire.tauxhoraire}
                            onChange={this.handleChange}
                            />€/heure</p>
                        </div>
                        <div className="large-1 columns">
                          <p className="eastern-blue">Quantité</p>
                          <AutosizeInput
                            name="prestaire-tauxhoraire"
                            value="4"
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="large-1 columns">
                          <p className="eastern-blue">Total</p>
                          <p><AutosizeInput
                            name="prestaire-tauxhoraire"
                            value="4000"
                            onChange={this.handleChange}
                            />€</p>
                        </div>
                      </div>
                    </div>

                    <div className="row-fluid">
                      <div className="large-11 columns">
                        <p className="text-right"><strong>Total</strong></p>
                      </div>
                      <div className="large-1 columns">
                        <p>4400€<sub>HT</sub></p>
                      </div>
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <p className="text-center">Suite à la sélection de l’une des formules, un devis final sera établi.</p>
                    <p className="text-center"><strong>Acompte de {this.state.acomptePourcentage}% nécéssaire pour lancer le projet.</strong></p>
                  </div>

                  {this.state.showComponentServicesAdditionnels &&
                    <div className="container container-proposition">
                      <p
                        className="garbage"
                        onClick={() => this.setState({showComponentServicesAdditionnels: false})}
                       />
                       <h2>Services additionnels</h2>
                       <TextareaAutosize
                         useCacheForDOMMeasurements
                         className="lynch"
                         name="servicesAdditionnels"
                         value={this.state.proposition.servicesAdditionnels}
                         onChange={this.handleChangeTextArea}
                       />
                    </div>
                  }

                  {this.state.showComponentPourquoi &&
                    <div className="container container-proposition">
                      <p
                        className="garbage"
                        onClick={() => this.setState({showComponentPourquoi: false})}
                       />
                       <h2>Pourquoi moi</h2>
                       <TextareaAutosize
                         useCacheForDOMMeasurements
                         className="lynch"
                         name="pourquoi"
                         value={this.state.proposition.pourquoi}
                         onChange={this.handleChangeTextArea}
                       />
                    </div>
                  }

                  {this.state.showComponentTemoignages &&
                    <div className="container container-proposition">
                      <p
                        className="garbage"
                        onClick={() => this.setState({showComponentTemoignages: false})}
                       />
                       <h2>Témoignages</h2>
                       <TextareaAutosize
                         useCacheForDOMMeasurements
                         className="lynch"
                         name="temoignages"
                         value={this.state.proposition.temoignages}
                         onChange={this.handleChangeTextArea}
                       />
                    </div>
                  }

                  <div className="container container-proposition">
                    <h2>Note</h2>
                    <TextareaAutosize
                      useCacheForDOMMeasurements
                      className="lynch"
                      name="note"
                      value={this.state.proposition.note}
                      onChange={this.handleChangeTextArea}
                    />
                  </div>

                  <div className="container container-proposition">
                    <h2>Termes et conditions</h2>
                    <TextareaAutosize
                      useCacheForDOMMeasurements
                      className="lynch"
                      name="conditions"
                      value={this.state.proposition.conditions}
                      onChange={this.handleChangeTextArea}
                    />
                  </div>

                  {this.state.showComponentCTA &&
                    <div className="container container-proposition">
                      <p
                        className="garbage"
                        onClick={() => this.setState({showComponentCTA: false})}
                       />
                       <h2 className="text-center">Contactez-moi</h2>
                       <p className="text-center">
                         Laurent M. consultant webmarketing<br/>
                         06.XX.XX.XX.XX, laurentm@monsupersite.com<br/>
                       {this.state.prestataire.adresse}, {this.state.prestataire.cp} {this.state.prestataire.ville}
                       </p>
                    </div>
                  }

                </div>
                <div className="large-3 columns">
                  <h3>Paramètres</h3>
                  <p className="lynch m-size">Pour cette proposition</p>
                  <ul className="menu-edit">
                    <li><p>Accepter les cartes de crédits<br/> <span>Permettez aux clients de vous payer en ligne</span></p></li>
                    <li><p>Personnalisé le style<br/> <span>Changez le template, les couleurs, les typographies</span></p></li>
                  </ul>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    );
  }
}

export default EditProposition;
