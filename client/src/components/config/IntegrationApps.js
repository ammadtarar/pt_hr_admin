import React from 'react';
import Aside from '../Aside';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import database from '../../firebase/firebase';

export class IntegrationAppsTierces extends React.Component {
  constructor() {
    super();
    this.state = {
      paiements: {
        modePaiement: {
          stripe: false,
          paypal: false,
          rib: false,
          cheque: false
        },
        rib: [],
        cheque: []
      }
    }
  }

  handleChangeTextArea = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleDesactivateCheque = (e) => {
    e.preventDefault();
    // if (this.state.paiements.cheque.ready === true) {
    //   database.ref().set({
    //     paiements: {
    //       cheque: {
    //         ready: false,
    //       }
    //     }
    //   });
    // }
    // this.setState({
    //   paiements: {
    //     cheque: {
    //       ready: !this.state.paiements.cheque.ready
    //     }
    //   }
    // })
  }

  preventDragHandler = (e) => {
    e.preventDefault();
  }

  getConfigPaiements(res) {
    const paiements = res.paiements
    this.setState({
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

  componentDidMount() {
    fetch('http://localhost:8081/configuration')
      .then(res => res.json())
      .then(res => this.getConfigPaiements(res))
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="integration-apps">
            <section className="container transparent">
              <h1>Intégration des Applications Tierces</h1>
            </section>

            <section className="container shadows">
              <h2>Méthode(s) de paiement par défaut :</h2>
              <p>Choisissez celle(s) que vous proposez à vos clients, elles apparaitrons en bas de factures.</p>
              <ul className="mode-paiement">
                <li className={this.state.paiements.modePaiement.rib === true ? 'checked' : ''}><div className="box-logo"><p>Virement bancaire</p></div></li>
                <li className={this.state.paiements.modePaiement.paypal === true ? 'checked' : ''}><div className="box-logo"><img type="image/svg+xml" className="icon-paypal" src="/icons/stripe.svg" alt="" onDragStart={this.preventDragHandler}/></div></li>
                <li className={this.state.paiements.modePaiement.stripe === true ? 'checked' : ''}><div className="box-logo"><img type="image/svg+xml" className="icon-stripe" src="/images/paypal-logo.png" alt="" onDragStart={this.preventDragHandler}/></div></li>
                <li className={this.state.paiements.modePaiement.cheque === true ? 'checked' : ''}><div className="box-logo"><img type="image/svg+xml" className="icon-email" src="/icons/email.svg" alt="" onDragStart={this.preventDragHandler}/></div></li>
              </ul>
            </section>

            <section className="container border-left-cornflower-blue shadows">
              <img type="image/svg+xml" className="icon-stripe" src="/icons/stripe.svg" alt="" onDragStart={this.preventDragHandler}/>
              <button className="btn align-right">Connecter à Stripe</button>
              <p>
                Paiement en ligne : nous utilisons Stripe, une des meilleurs solutions.
                <br/><br/>
                You can start accepting online payments in just two steps. Your clients will love the simplicity and you'll love getting your invoices paid twice as fast. Get started below
              </p>
              <ul>
                <li>Get paid easily, quickly and securely</li>
      					<li>No set-up, monthly cost or hidden fees</li>
      					<li>Make tax season less stressful</li>
      					<li>Easily turn online payments on and off with each invoice</li>
              </ul>
            </section>

            <section className="container border-left-curious-blue shadows">
              <img type="image/svg+xml" className="icon-paypal" src="/images/paypal-logo.png" alt="" onDragStart={this.preventDragHandler}/>
              <button className="btn align-right">Connecter à PayPal</button>
              <p>Accéder aux paiements via PayPal</p>
            </section>

            <section className="container border-left-vermillion shadows">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h2>Virements bancaires</h2>
                  {this.state.paiements.rib.ready === true ? <p>Accéder aux paiements par virement bancaire</p> : ''}
                </div>
                <div className="large-6 columns">
                  {this.state.paiements.rib.ready === true ?
                    <button className="btn-fifth align-right">Désactiver les virements bancaires</button>
                      :
                    <button className="btn align-right">Entrer mon RIB</button>
                  }
                </div>
              </div>

              {this.state.paiements.rib.ready === true ?
              <form>
                <div className="row-fluid">
                  <div className="large-12 columns">
                    <label>Nom de la banque</label>
                    <input type="text" className="full-width" placeholder="Boursorama" value={this.state.paiements.rib.nomBanque}/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-12 columns">
                    <label>Domiciliation de la banque</label>
                    <TextareaAutosize
                      useCacheForDOMMeasurements
                      style={{minHeight: 90}}
                      name="description"
                      placeholder="Boursorama Banque 44 rue Traversière 92772 BOULOGNE-BILLANCOURT CEDEX"
                      value={this.state.paiements.rib.domiciliation}
                      onChange={this.handleChangeTextArea}
                    />
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-6 columns">
                    <label>BIC</label>
                    <input type="text" placeholder="BANQUE FRPP XXX" value={this.state.paiements.rib.bic}/>
                  </div>
                  <div className="large-6 columns">
                    <label>IBAN</label>
                    <input type="text" placeholder="FR76 4000 0298 7920 5400 0234 883" value={this.state.paiements.rib.iban}/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-12 columns">
                    <label>RIB</label>
                    <input type="number" className="quarter-width" placeholder="Code Banque" value={this.state.paiements.rib.codeBanque}/>
                    <input type="number" className="quarter-width" placeholder="Code Guichet" value={this.state.paiements.rib.codeGuichet}/>
                    <input type="number" className="quarter-width" placeholder="N° compte" value={this.state.paiements.rib.numeroCompte}/>
                    <input type="number" className="quarter-width" placeholder="Clé RIB" value={this.state.paiements.rib.cleRIB}/>
                  </div>
                </div>
              </form> : ''}
            </section>

            <section className="container border-left-matterhorn shadows">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h2>Virement par chèque</h2>
                  {this.state.paiements.cheque.ready === true ? <p>Accéder aux paiements par chèque</p> : ''}
                </div>
                <div className="large-6 columns">
                  {this.state.paiements.rib.ready === true ?
                    <button className="btn-fifth align-right" onClick={(event) => this.handleDesactivateCheque(event)}>Désactiver les paiements par chèque</button>
                      :
                    <button className="btn align-right">Éditer info chèque</button>
                  }
                </div>
              </div>

              {this.state.paiements.cheque.ready === true ?
              <form>
                <div className="row-fluid">
                  <div className="large-12 columns">
                    <label>Adresse postale</label>
                    <TextareaAutosize
                      useCacheForDOMMeasurements
                      style={{minHeight: 90}}
                      name="description"
                      placeholder="113 rue des Tenturiers, 75008 Paris — France"
                      value={this.state.paiements.cheque.domiciliation}
                      onChange={this.handleChangeTextArea}
                    />
                  </div>
                </div>
              </form> : ''}
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default IntegrationAppsTierces;
