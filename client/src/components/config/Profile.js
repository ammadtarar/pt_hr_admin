import React from 'react';
import { Link } from 'react-router-dom';
import Aside from '../Aside';
import database from '../../firebase/firebase';
import DragDropLogo from '../modules/DragDropLogo';

export class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      nom: '',
      prenom: '',
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    database.ref('abonnement/configuration').on('value', (snapshot) => {
      const val = snapshot.val();

      this.setState({
        prenom: val.prenom,
        nom: val.nom,
        email: val.email,
        password: val.password
      });
    });
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="profile">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="small-2 large-6 columns">
                  <h1>Profile</h1>
                </div>
              </div>
            </section>

            <section className="section-2 container shadows">
              <form>
                <div className="row-fluid">
                  <div className="large-2 columns"></div>
                  <div className="large-10 columns">
                    <img type="image/svg+xml" className="image-profile-big" src="/images/image-profile.jpg" alt=""/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns"></div>
                  <div className="large-10 columns">
                    <p><Link to="/mot-de-passe/nouveau">Changer d'image de profile</Link></p>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Nom</label>
                  </div>
                  <div className="large-10 columns">
                    <input type="text" className="half-width" value={this.state.prenom} placeholder="Votre prénom"/>
                    <input type="text" className="half-width" value={this.state.nom} placeholder="Votre nom"/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Adresse email</label>
                  </div>
                  <div className="large-10 columns">
                    <input type="text" className={this.state.email ? 'has-value full-width' : 'full-width'} placeholder="Votre email" onChange={this.handleChange} value={this.state.email}/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns"></div>
                  <div className="large-10 columns">
                    <p><Link to="/mot-de-passe/nouveau">Changer d'adresse email</Link></p>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Mot de passe</label>
                  </div>
                  <div className="large-10 columns">
                    <input type="password" className={this.state.password ? 'has-value full-width' : 'full-width'} placeholder="Votre mot de passe" onChange={this.handleChange} value={this.state.password}/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns"></div>
                  <div className="large-10 columns">
                    <p><Link to="/mot-de-passe/nouveau">Changer de mot de passe</Link></p>
                  </div>
                </div>
              </form>
            </section>

            <section className="container shadows">
              <h2>Fermer ce compte</h2>
              <p>
                Cliquez sur le bouton ci-dessous pour supprimer l'intégralité de votre compte Wave. Cela signifie que vous ne pourrez plus accéder à vos entreprises, à vos dossiers de comptabilité et de paie, ni à vos informations financières personnelles.
                <br/><br/>
                Cette action est irréversible.
              </p>
              <button className="btn-fifth align-left">Fermer ce compte Bonsai</button>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default Profile;
