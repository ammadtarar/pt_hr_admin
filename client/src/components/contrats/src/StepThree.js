import React from 'react';

export class StepThree extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <section className="container transparent step3">
        <div className="row-fluid">
          <div className="large-10 columns">
            <h1>Paiement</h1>
            <p>Remplissez les informations de base</p>
          </div>
          <div className="large-2 columns">
            <p className="align-right l-size">3 / 4</p>
          </div>
        </div>
        <hr/>
        <div className="row-fluid">
          <div className="large-8 columns">
            <p>
              Le Client paiera un <span className="editable">forfait</span> de <span className="editable">3200 €</span>.<br/><br/>
              Avant le début des travaux, le Client paiera un acompte de 30%, soit <span className="editable">960 €</span>.<br/><br/>
              Pour le reste du montant, je les facturerai <span className="editable">à la fin du projet</span>.<br/>
              Le Client a <span className="editable">15 jours</span> pour payer la facture.<br/>
              Les paiements en retard entraînent des frais de <span className="editable">0%</span> par mois.<br/>
              Ce contrat débutera le <span className="editable">25 septembre 2018</span> et se terminera à <span className="editable">une date précise</span>.<br/><br/>
              Ce contrat se terminera le <span className="editable">25 octobre 2018</span> le client paiera <span className="editable">un montant au
              prorata pour le temps travaillé</span>.
            </p>
          </div>
          <div className="large-4 columns">
            <p className="info">
              Un acompte représente généralement 20 à 50% du budget total du contrat. Plus le client est petit, plus un grand acompte est raisonnable.
              Si vous facturez à l'heure, estimez le total en fonction du nombre d'heures que vous prévoyez travailler.
              Si vous ne voulez pas de dépôt, entrez simplement 0.
            </p>
          </div>
        </div>
        <hr/>
      </section>
    );
  }
}

export default StepThree;
