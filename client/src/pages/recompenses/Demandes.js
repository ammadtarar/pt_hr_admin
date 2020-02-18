import React from 'react'
import Header from '../../components/Header'
import NavRecompenses from '../../components/NavRecompenses'

export class Demandes extends React.Component {
  constructor() {
    super()
    this.state = { checked: false, popupOpen: false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(checked) {
    this.setState({ checked })
  }

  preventDragHandler = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>

        <div onClick={(e) => this.setState({popupOpen: false})} className={`overlay-popup ${this.state.popupOpen === true ? 'open' : ''}`}/>
        <div className={`popup center ${this.state.popupOpen === true ? 'open' : ''}`}>
          <h4 className="text-center">Etes-vous sûr de vouloir changer le statut de candidature de <span>Debra Mccoy</span> de <span>Entretiens en cours</span> à <span>Sélectionné</span>, pour l’offre de <span>Customer success manager</span> ?</h4>
          <p className="text-center">Cette action est irréversible et notifiera automatiquement le collaborateur l’ayant coopté.</p>
          <div className="box-note-popup">
            <p><strong>Conseil </strong><br/>Pensez à archiver les candidats non sélectionnés pour cette offre !</p>
          </div>
          <button className="btn-primary">Oui, changer</button>
          <button onClick={(e) => this.setState({popupOpen: false})} className="btn-secondary">Annuler</button>
        </div>

        <main className="recompenses">
          <div className="container">
            <NavRecompenses/>
            <div className="box-demande">
              <ul className="titre">
                <li><h4>Shawn Black</h4></li>
                <li><p><span>Abonnement de 6 mois à Netflix</span></p></li>
              </ul>
              <ul className="infos">
                <li><button onClick={(e) => this.setState({popupOpen: true})} className="btn-primary">Traiter</button></li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Demandes;
