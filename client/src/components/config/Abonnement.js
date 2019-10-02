import React from 'react';
import Aside from '../Aside';
var createReactClass = require('create-react-class');

const Tabs = createReactClass({
  getInitialState(){
    return {
      selected:this.props.selected || 0
    }
  },
  render(){
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="abonnement">
            <section className="section-1 container transparent">
              <div className="container transparent">
                <h1>Abonnement et mise à niveau</h1>
              </div>
            </section>

            <section className="section-2 container shadows">
              <h2 className="headline text-center cornflower-blue">Faites la mise à niveau aujourd’hui et ne payez pas tant que votre période d’essai n’est pas terminé</h2>
              <p className="text-center">
                Choisissez un plan pour continuer à utiliser FreshBooks. Votre carte ne sera pas débitée
                avant la fin de votre procès dans 16 jours. Besoin d'un coup de main? Communiquez avec notre
                équipe de support : 1 866 303-6061 ou <a href="mailto:contact@freelanceapp.com"title="">envoyez-nous un email</a>.
              </p>

              <ul className="tab-abonnement">
                {this.props.children.map((elem,index)=>{
                  let style = index === this.state.selected ? 'selected': '';
                 return <li className={style} key={index} onClick={this.handleChange.bind(this,index)}>{elem.props.title}</li>
                })}
              </ul>
              <div className="tab">{this.props.children[this.state.selected]}</div>

              <h3 className="headline text-center cornflower-blue">De puissantes features inclus avec les deux formules</h3>
              <div className="row-fluid">
                <div className="columns small-4 large-4">
                  <h3 className="cornflower-blue text-center">Personnalisation de factures, devis avec templates professionnels</h3>
                  <p className="text-center">
                    Ducimus qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas
                    molestias excepturi sint occaecati
                  </p>
                </div>
                <div className="columns small-4 large-4">
                  <h3 className="cornflower-blue text-center">Création de proposition commerciales selon un modèle pour remporter des contrats</h3>
                  <p className="text-center">
                    Ducimus qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas
                    molestias excepturi sint occaecati
                  </p>
                </div>
                <div className="columns small-4 large-4">
                  <h3 className="cornflower-blue text-center">Signatures électroniques des devis et contrats</h3>
                  <p className="text-center">
                    Ducimus qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas
                    molestias excepturi sint occaecati
                  </p>
                </div>
              </div>
              <div className="row-fluid">
                <div className="columns small-4 large-4">
                  <h3 className="cornflower-blue text-center">Connectez votre banque pour traker vos dépenses</h3>
                  <p className="text-center">
                    Ducimus qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas
                    molestias excepturi sint occaecati
                  </p>
                </div>
                <div className="columns small-4 large-4">
                  <h3 className="cornflower-blue text-center">Calcul de charges et rappels administratifs</h3>
                  <p className="text-center">
                    Ducimus qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas
                    molestias excepturi sint occaecati
                  </p>
                </div>
                <div className="columns small-4 large-4">
                  <h3 className="cornflower-blue text-center">Soyez payé plus rapidement grâce au paiement en ligne</h3>
                  <p className="text-center">
                    Ducimus qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas
                    molestias excepturi sint occaecati
                  </p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    )
  },
  handleChange(index){
    this.setState({selected:index})
  }
})

const Panel = createReactClass({
  render(){
    return (
      <div>{this.props.children}</div>
    )
  }
})

export class Abonnement extends React.Component {
  render(){
    return (
      <Tabs selected={0}>
        <Panel title="mensuel">

          <div className="row tab-content">
            <div className="columns large-6">
              <p className="nom-formule">Plus</p>
              <p className="prix">12<sup>€</sup><span>/ mois</span></p>
              <ul className="formule-specs">
                <li>Clients illimités</li>
                <li>Factures et estimations illimitées</li>
                <li>Suivi du temps et des dépenses</li>
                <li>Accès au support client</li>
              </ul>
              <button className="btn-third align-center">Selectionner</button>
            </div>
            <div className="columns large-6">
              <p className="nom-formule">Premium</p>
              <p className="prix">22<sup>€</sup><span>/ mois</span></p>
              <ul className="formule-specs">
                <li>Toutes les fonctionnalités plus</li>
                <li>Rappels de paiement automatique</li>
                <li>Frais de retard</li>
                <li>Planifier des factures récurrentes</li>
                <li>Envoyer des propositions</li>
                <li>E-signatures sur les propositions</li>
                <li>Rapports comptables</li>
              </ul>
              <button className="btn-primary align-center">Selectionner</button>
            </div>
          </div>

        </Panel>
        <Panel title="annuel">
          <div className="row tab-content">
            <div className="columns small-2 large-6">
              <p className="nom-formule">Plus</p>
              <p className="prix">9<sup>€</sup><span>/ mois</span></p>
              <ul className="formule-specs">
                <li>Clients illimités</li>
                <li>Factures et estimations illimitées</li>
                <li>Suivi du temps et des dépenses</li>
                <li>Accès au support client</li>
              </ul>
              <button className="btn-third align-center">Selectionner</button>
            </div>
            <div className="columns small-4 large-6">
              <p className="nom-formule">Premium</p>
              <p className="prix">20<sup>€</sup><span>/ mois</span></p>
              <ul className="formule-specs">
                <li>Toutes les fonctionnalités plus</li>
                <li>Rappels de paiement automatique</li>
                <li>Frais de retard</li>
                <li>Planifier des factures récurrentes</li>
                <li>Envoyer des propositions</li>
                <li>E-signatures sur les propositions</li>
                <li>Rapports comptables</li>
              </ul>
              <button className="btn-primary align-center">Selectionner</button>
            </div>
          </div>
        </Panel>
      </Tabs>
    )
  }
};

export default Abonnement;
