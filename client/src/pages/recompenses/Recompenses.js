import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../components/Header'
import NavRecompenses from '../../components/NavRecompenses'
import Switch from 'react-switch'

export class Recompenses extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: false,
      popupOpen: false
    }
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
        <div className={`popup ${this.state.popupOpen === true ? 'open' : ''}`}>
          <img onClick={(e) => this.setState({popupOpen: false})} type="image/svg+xml" className="close" src="/icons/fermer.svg" alt=""/>
          <h3>Créer une récompense</h3>
          <form>
            <label>Nom</label>
            <input type="text" value="Nom de la récompense"/>
            <label>Nombre de points</label>
            <input type="text" value="Nombre de points requis"/>
            <button className="btn-primary">Publier</button>
            <p className="note">Une fois publiée, cette récompense sera visible par tous les ambassadeurs.</p>
          </form>
        </div>
        <main className="recompenses">
          <div className="container">
            <NavRecompenses/>
            <button onClick={(e) => this.setState({popupOpen: true})} className="btn-primary">Créer</button>
            <div className="box-recompense">
              <ul className="titre">
                <li><h4>Bonus de 1000 €</h4></li>
              </ul>
              <ul className="details">
                <li>
                  <p className="react-switch">
                  <Switch
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    onColor="#155ac4"
                    onHandleColor="white"
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={20}
                    width={35}
                    className="react-switch"
                  />
                  Actif</p>
                </li>
              </ul>
              <ul className="infos">
                <li className="box-points"><span>600</span> points</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Recompenses;
