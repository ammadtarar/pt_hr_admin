import React from 'react';
import { Link } from 'react-router-dom';
import Aside from './aside/AsideTermine.js';
import Avancement from './Avancement.js';

export class InscriptionTermine extends React.Component {
  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper initialisation">
          <main className="initialisation termine">
            <section className="section-1 transparent">
              <Avancement/>
            </section>

            <section className="section-2 transparent">
              <div className="container shadows">
                <div className="box-popup">
                  <h1>Configuration terminée</h1>
                  <p>
                    Julien,<br/>
                    Tu renouvelles la numérotation de tes devis <span className="cornflower-blue">chaque année</span>, et celle de tes factures <span className="cornflower-blue">chaque année</span>.
                    Ton prochain devis aura le numéro <span className="cornflower-blue">D201904-001</span> et ta prochaine facture le numéro <span className="cornflower-blue">2019F04-001</span>.
                    Tu as au total <span className="cornflower-blue">22,3%</span> de cotisations sociales à payer <span className="cornflower-blue">tous les trimestres</span>.
                    Cotisations comprennant <span className="cornflower-blue">22%</span> de charges et <span className="cornflower-blue">0.3%</span> de cotisations à la formation professionnelle.<br/>
                    Et tu <span className="cornflower-blue">n'es pas soumis à la TVA.</span>
                  </p>
                </div>
                <div className="box-popup-buttons">
                  <Link to="/inscription/banque"><button className="btn-third align-left">Retour</button></Link>
                  <Link to="/"><button className="align-right">Valider</button></Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default InscriptionTermine;
