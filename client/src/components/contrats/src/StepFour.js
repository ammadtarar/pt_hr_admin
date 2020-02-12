import React from 'react';

export class StepFour extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <section className="container transparent step4">
        <div className="row-fluid">
          <div className="large-10 columns">
            <h1>Facturation</h1>
            <p>Remplissez les informations de base</p>
          </div>
          <div className="large-2 columns">
            <p className="align-right l-size">4 / 4</p>
          </div>
        </div>
        <hr/>
        <div className="row-fluid">
          <div className="large-12 columns">
            <p>
              <span className="cornflower-blue">Les Contrats et Paiements sont intégrés pour simplifier votre travail indépendant.</span><br/>
              Envoyer des factures via Bonsai. Soyez payé par carte de crédit.<br/>
              Les paiements automatisés vous permettent de gagner du temps et d'éviter les retards de paiement.
            </p>
            <p>Nous créeons 2 factures pour ce projet :</p>
            <ol>
              <li>Facture: Accompte <span className="cornflower-blue">de 960€</span> sera émise le 25 Septembre 2018</li>
              <li>Facture: Solde tout compte <span className="cornflower-blue">de 2240€</span> sera émise le 25 octobre 2018</li>
            </ol>
            <p>
              <span className="cornflower-blue">Ne pas créer</span> ces factures automatiquement et <span className="cornflower-blue">ne pas les envoyer</span> automatiquement en mon nom
              <em>(Vous pouvez toujours les consulter et les modifier avant de les envoyer).</em>
            </p>
          </div>
        </div>
        <hr/>
      </section>
    );
  }
}

export default StepFour;
