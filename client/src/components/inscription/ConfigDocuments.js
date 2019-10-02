import React from 'react';
import { Link } from 'react-router-dom';
import Aside from './aside/AsideConfigDocuments';
import Avancement from './Avancement';

export class InscriptionConfigDocuments extends React.Component {
  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper initialisation">
          <main className="initialisation config-documents">
            <section className="section-1 transparent">
              <Avancement/>
            </section>

            <section className="section-2 transparent">
              <div className="container shadows">
                <div className="box-popup">
                  <h1>Configuration des documents</h1>
                  <p>Nous avons besoin de précision concernant tes devis et factures.<br/><br/>
                     Tu remets à zéro ta numérotation de devis
                  </p>

                  <p>Tu remets à zéro ta numérotation de factures</p>
                </div>
                <div className="box-popup-buttons">
                  <Link to="/inscription/entreprise"><button className="btn-third align-left">Retour</button></Link>
                  <Link to="/inscription/banque"><button className="align-right">Suivant</button></Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default InscriptionConfigDocuments;
