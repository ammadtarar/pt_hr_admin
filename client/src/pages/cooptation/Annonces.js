import React from 'react'
import Header from '../../components/Header'
import NavCooptation from '../../components/NavCooptation'
import Switch from 'react-switch'

export class Annonces extends React.Component {
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
        <main className="cooptation annonces">
          <div className="container">
            <NavCooptation/>
            <div className="box-annonce">
              <ul className="titre">
                <li><h4>Product Manager</h4></li>
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
                <li className="star"><p><span>1000</span>€</p></li>
                <li className="localisation"><p>New-York</p></li>
              </ul>
              <ul className="infos">
                <li className="box-candidats-cooptes"><span>3</span> candidats cooptés</li>
                <li className="box-views-small"><span>243</span></li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Annonces;
