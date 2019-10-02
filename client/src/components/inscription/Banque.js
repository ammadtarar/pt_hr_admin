import React from 'react';
import { Link } from 'react-router-dom';
import Aside from './aside/AsideBanque.js';
import Avancement from './Avancement';
import axios from 'axios';

export class InscriptionBanque extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookID: '',
      bookTitle: '',
      bookAuthor: '',
    };
  }

  synchroBankin (e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:9000/synchro',
      data: {
        email: 'jules84000@yahoo.fr'
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper initialisation">
          <main className="initialisation tva">
            <section className="section-1 transparent">
              <Avancement/>
            </section>

            <section className="section-2 transparent">
              <div className="container shadows">
                <div className="box-popup">
                  <h1>Synchronisation de votre banque</h1>
                  <p>Freelance App génère automatiquement votre comptabilité en synchronisant votre compte bancaire.</p>
                  <p>Synchroniser votre compte bancaire pour avoir accès à vos crédits et dépenses.</p>
                  <p>Fiable et sécurisé : les serveurs Bankin sont certifiés ISO 27001, et répondent à la norme PCI DSS niveau 1 (niveau bancaire)</p>
                  <Link to="/inscription/resume"><button className="btn-third align-left">Synchroniser plus tard</button></Link>
                  <button onClick={this.synchroBankin} className="align-right">Synchroniser mon compte</button>
                </div>
                <div className="box-popup-buttons">
                  <Link to="/inscription/configuration-documents"><button className="btn-third align-left">Retour</button></Link>
                  <Link to="/inscription/termine"><button className="align-right">Suivant</button></Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default InscriptionBanque;
