import React from 'react'
import Switch from 'react-switch'

export class BoxRecompense extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      data: this.props.data
     }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(checked) {
    this.setState({ checked })
  }

  date(dateToFormat) {
    const date = new Date(dateToFormat)
    date.setDate(date.getDate())
    const mois = [
      "Janvier", "Février", "Mars",
      "Avril", "Mai", "Juin", "Jullet",
      "Août", "Septembre", "Octobre",
      "Novembre", "Décembre"
    ]
    const dateReformat = date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear()
    return dateReformat
  }

  render() {
    const data = this.state.data
    const dateToFormat = data.date;

    return (
      <div className="box-annonce">
        <ul className="titre">
          <li><h4>{data.titre}</h4></li>
          <li className="date"><p>Créé le <span>{this.date(dateToFormat)}</span></p></li>
        </ul>
        <ul className="details">
          <li>
            <p className="react-switch">
            <Switch
              checked={data.checked}
              onChange={this.handleChange}
              onColor="#155ac4"
              offColor="#c0c9d6"
              onHandleColor="#ffffff"
              offHandleColor="#ffffff"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={35}
              className="react-switch"
            />
            Actif</p>
          </li>
          <li className="star"><p><span>{data.points}</span>€</p></li>
          <li className="localisation"><p>{data.lieu}</p></li>
        </ul>
        <ul className="infos">
          {data.checked === true ? <li className="box-candidats-cooptes"><span>{data.cooptations}</span> {data.cooptations === 1 ? 'candidat coopté' : 'candidats cooptés'}</li> : ''}
          <li className="box-views-small"><span>{data.views}</span></li>
        </ul>
      </div>
    )
  }
}

export default BoxRecompense
