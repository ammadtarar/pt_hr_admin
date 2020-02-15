import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header'
import NavRecompenses from '../components/NavRecompenses'
import Switch from 'react-switch'

export class Recompenses extends React.Component {
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
            <button className="btn-primary">Créer</button>
            <div className="box-recompense">
              <ul className="titre">
                <li><h4>Bonus de 1000 €</h4></li>
                <li className="date"><p>Créé le <span>23 décembre 2019</span></p></li>
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
