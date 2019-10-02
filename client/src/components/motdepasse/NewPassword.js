import React from 'react';
import { Link } from 'react-router-dom';

export class NewPassword extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      formErrors: {email: ''},
      emailLogin: '',
      isLogged: false
    }
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    if ((this.state.email === emailValid)) {
      this.setState(() => ({
        isLogged: true
      }))
      this.props.history.push('/');
    } else {
      this.setState({
        formErrors: {
          email: 'has-error'
        }
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <main className="login">
          <section className="container transparent">
            <div className="box-item">
              <img type="image/svg+xml" className="logo" src="/images/logo.png" alt="" onmousedown="return false" onmousemove="return false"/>
              <h5 className="blanc">Automatisez la gestion de votre entreprise freelance</h5>
              <h1 className="blanc text-center">Oublié votre mot de passe?</h1>
              <p className="blanc text-center">Entrez votre adresse email, nous vous enverrons les instructions pour le remettre à zéro.</p>
              <form onSubmit={this.onSubmit}>
                <input className={this.state.formErrors.email}
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={(event) => this.handleUserInput(event)}
                  placeholder="Adresse email"/>
                <button type="submit" className="btn btn-primary">Remettre à zéro le mot de passe</button>
              </form>
              <p className="blanc text-center">Vous avez déjà un compte? <Link className="link" to="/identification">Identifiez-vous</Link></p>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default NewPassword;
