import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/signup';
import database from '../firebase/firebase';
import moment from 'moment';
import uuid from 'uuid';

export class Inscription extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      clientKey: '',
      email: '',
      password: '',
      confirmedPassword: '',
      formErrors: {email: '', password: '', confirmedPassword: ''}
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

    database.ref('clients').orderByChild('email').equalTo(`${email}`).on('value', function (snapshot) {
      const val = snapshot.val();

      if (snapshot.exists()){
        console.log('email already exist in database')
      } else {
        if((self.state.email) && self.state.password === self.state.confirmedPassword) {
          const uid = uuid();
          const clientKey = self.state.email.replace(/[@._]/g, '');

          database.ref(`clients/${clientKey}`).update({
            email: self.state.email,
            motDePasse: self.state.confirmedPassword,
            inscriptionDate: moment().format(),
            abonnement: 'essai'
          });
          self.setState({
            formErrors: {email: '', password: '', confirmedPassword: ''},
            clientKey: clientKey
          });
          self.props.signup(clientKey);
          self.props.history.push({
            pathname: '/inscription/coordonnees'
          });

        } else {
          self.setState({
            formErrors: {
              email: 'has-error',
              password: 'has-error',
              confirmedPassword: 'has-error'
            }
          });
        }
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
              <h1 className="blanc text-center">Essayez Wemind gratuitement</h1>
              <p className="blanc text-center">Essai sans carte de crédit.<br/> Désabonnement quand vous voulez.</p>
              <form onSubmit={this.onSubmit}>
                <input className={this.state.formErrors.email}
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={(event) => this.handleUserInput(event)}
                  placeholder="Adresse email"/>
                <input className={this.state.formErrors.password}
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={(event) => this.handleUserInput(event)}
                  placeholder="Mot de passe (8 caractères min.)"/>
                <input className={this.state.formErrors.confirmedPassword}
                  type="text"
                  name="confirmedPassword"
                  value={this.state.confirmedPassword}
                  onChange={(event) => this.handleUserInput(event)}
                  placeholder="Confirmez le mot de passe"/>
                <button type="submit" className="btn btn-primary">S'inscrire</button>
              </form>
              <p className="blanc text-center">En continuant vous agréez <Link className="link" to="/identification" target="_blank">les termes de services</Link></p>
              <p className="blanc text-center">Vous avez déjà un compte? <Link className="link" to="/identification">Identifiez-vous</Link></p>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup: (clientKey) => dispatch(signup({ clientKey: clientKey}))
});

export default connect(undefined, mapDispatchToProps)(Inscription);
