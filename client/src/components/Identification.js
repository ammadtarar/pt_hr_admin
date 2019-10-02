import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/auth';
import database from '../firebase/firebase';

export class Identification extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      motDePasse: '',
      formErrors: {email: '', motDePasse: ''},
      emailLogin: '',
      motDePasseLogin: ''
    }
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = this.state.email;
    var self = this;

    database.ref('clients').orderByChild("email").equalTo(`${email}`).on('value', function (snapshot) {
      const val = snapshot.val();

      if (snapshot.exists()){
        //Check si période d'essai terminée ou pas
        var dateInscription = new Date(val[Object.keys(val)[0]].inscriptionDate);
        var today = new Date();
        var tempsDiff = Math.abs(today.getTime() - dateInscription.getTime());
        var diffJours = Math.ceil(tempsDiff / (1000 * 3600 * 24));

        if(diffJours > 15) {
          self.props.history.push('/reactivation');
        } else {
          snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();

            if (self.state.motDePasse === childData.motDePasse) {
              self.props.login();
              self.props.history.push('/');
            } else {
              self.setState({
                formErrors: {
                  motDePasse: 'has-error'
                }
              });
            }
          });
        }

      } else {
        self.setState({
          formErrors: {
            email: 'has-error',
            motDePasse: 'has-error'
          }
        });
      }
    });
  }

  render() {
    return (
      <div className="wrapper">
        <main className="login">
          <section className="container transparent">
            <div className="box-item">
              <img type="image/svg+xml" className="logo" src="/images/logo.png" alt=""/>
              <h5 className="blanc">Automatisez la gestion de votre entreprise freelance</h5>
              <h1 className="blanc text-center">Connectez-vous à votre compte</h1>
              <p className="blanc text-center">Pour vous identifier entrez votre adresse email ci-dessous</p>
              <form onSubmit={this.onSubmit}>
                <input className={this.state.formErrors.email}
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={(event) => this.handleUserInput(event)}
                  placeholder="Adresse email"/>
                <input className={this.state.formErrors.motDePasse}
                  type="text"
                  name="motDePasse"
                  value={this.state.motDePasse}
                  onChange={(event) => this.handleUserInput(event)}
                  placeholder="Mot de passe"/>
                <button type="submit" className="btn btn-primary">S'identifier à Wemind</button>
              </form>
              <p className="text-center"><Link className="link" to="/mot-de-passe/nouveau">Oublié votre mot de passe?</Link></p>
              <p className="blanc text-center">Pas de compte? <Link className="link" to="/inscription">Inscrivez-vous</Link></p>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (loginStatus) => dispatch(login())
});

export default connect(undefined, mapDispatchToProps)(Identification);
