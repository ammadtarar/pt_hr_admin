import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

export class Aside extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      caAnnee: ''
    }
  };

  componentDidMount() {
    fetch('/impayees')
      .then(res => res.json())
      .then(res => this.callTotalImpayes(res))
    fetch('/livre-recettes')
      .then(res => res.json())
      .then(res => this.callCA(res))
  }

  componentWillMount() {
    if(this.props.loginStatus === false) {
      this.props.history.push('/identification');
    }
  }

  //Total impayés
  callTotalImpayes(res) {
    const newState = [];
    var data = [];
    var total = 0;

    for (let item in res) {
      newState.push({
        montant: res[item].montant
      });
    }
    for (var i = 0; i < newState.length; i++) {
      total += newState[i].montant
    }
    this.setState({
      impayésTotal: total
    });
  }

  //Total chiffre d'affaire de l'année actuelle
  callCA(res) {
    const newState = [];
    var data = [];
    var total = 0;

    if (res){
      for (let item in res) {
        if(res[item].status === 'Payée') {
          newState.push({
            montant: res[item].montant
          });
        }
      }
      for (var i = 0; i < newState.length; i++) {
        total += newState[i].montant
      }
      this.setState({
        caAnnee: total
      });
    }
  }

  render() {
    return (
      <aside>
        <Link to="/"><img type="image/svg+xml" className="logo" src="/images/logo-montana.png" alt=""/></Link>
        <div className="open-sub-menu">
          <div className="row">
            <div className="large-2 columns">
              <img type="image/svg+xml" className="image-profile" src="/images/image-profile.jpg" alt=""/>
            </div>
            <div className="large-10 columns">
              <p>Julien Lucas</p>
            </div>
          </div>
        </div>
        <ul className="sub-menu">
          <li className="title">Profile</li>
          <li><NavLink to="/profile" activeClassName="is-active" exact={true}>Mon profile</NavLink></li>
          <li><NavLink to="/identification" activeClassName="is-active">Déconnexion</NavLink></li>
          <li><NavLink to="/entreprise/profile" activeClassName="is-active">Profile entreprise</NavLink></li>
          <li><NavLink to="/facturation" activeClassName="is-active">Ma facturation</NavLink></li>
          <li><NavLink to="/integrations" activeClassName="is-active">Accepter les cartes de crédit</NavLink></li>
          <li><NavLink to="/abonnement" activeClassName="is-active">Abonnement et mise à niveau</NavLink></li>
          <li><NavLink to="/recommandations" activeClassName="is-active">Parrainages</NavLink></li>
          <li><NavLink to="/lien-devis" activeClassName="is-active">www.julienlucas.com</NavLink></li>
        </ul>

        <p>Chiffre d’affaire {new Date().getFullYear()}</p>
        <p className="chiffre-affaire">{this.state.caAnnee}€</p>
        <p>+{this.state.impayésTotal}€ en attente</p>
        <nav role="navigation">
          <ul className="menu">
            <li><NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink></li>
            <li><NavLink to="/devis" activeClassName="is-active">Devis <span>/</span> Propositions commerciales</NavLink></li>
            <li><NavLink to="/factures" activeClassName="is-active">Factures</NavLink></li>
            <li><NavLink to="/contrats" activeClassName="is-active">Contrats</NavLink></li>
            <li><NavLink to="/clients" activeClassName="is-active">Clients</NavLink></li>
            <li><NavLink to="/comptabilite" activeClassName="is-active">Comptabilité</NavLink></li>
            <li><NavLink to="/banque" activeClassName="is-active">Banque</NavLink></li>
          </ul>
        </nav>
        <p className="version text-center blanc">Freelance App version v1.0</p>
      </aside>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (loginStatus) => dispatch(login())
});

export default connect(undefined, mapDispatchToProps)(Aside);
