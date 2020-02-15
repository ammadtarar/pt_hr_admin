import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../components/Header'
import NavRecompenses from '../../components/NavRecompenses'
import Switch from 'react-switch'

export class Demandes extends React.Component {
  constructor() {
    super()
    this.state = { checked: false }
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
        <main className="recompenses">
          <div className="container">
            <NavRecompenses/>
            <div className="box-demande">
              <ul className="titre">
                <li><h4>Shawn Black</h4></li>
                <li><p><span>Abonnement de 6 mois à Netflix</span></p></li>
              </ul>
              <ul className="infos">
                <li><button className="btn-primary">Traiter</button></li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Demandes;
