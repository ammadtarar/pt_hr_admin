import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Header from '../components/Header';

export class Cooptation extends React.Component {
  constructor () {
    super()
  }

  componentDidMount() {
  }

  preventDragHandler = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="cooptation">
          <div className="container">
            <div className="row-fluid">
              <ul className="navigation">
                <li><NavLink to="/cooptation/candidats" activeClassName="is-active" exact={true}>Candidats</NavLink></li>
                <li><NavLink to="/cooptation/annonces" activeClassName="is-active" exact={true}>Annonces <span>6</span></NavLink></li>
                <li><NavLink to="/cooptation/candidats-archives" activeClassName="is-active" exact={true}>Candidats archivés</NavLink></li>
              </ul>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="regular">Candidats cooptés</h4>
                  <div className="box-encart">
                    <p>Coopté par <span>Samantha Leigh</span></p>
                    <p className="date">Le 23 décembre 2019</p>
                    <hr/>
                    <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                    <hr/>
                    <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="regular">Candidatures reçues</h4>
                  <div className="box-encart">
                    <p>Coopté par <span>Samantha Leigh</span></p>
                    <p className="date">Le 23 décembre 2019</p>
                    <hr/>
                    <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                    <hr/>
                    <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
                  </div>
                  <div className="box-encart">
                    <p>Coopté par <span>Samantha Leigh</span></p>
                    <p className="date">Le 23 décembre 2019</p>
                    <hr/>
                    <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                    <hr/>
                    <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="regular">Entretiens en cours</h4>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item denim">
                  <h4 className="regular">Candidats sélectionnés</h4>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Cooptation;
