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

  render() {
    const data = this.state.data

    return (
      <div className="box-recompense">
        <ul className="titre">
          <li><h4>{data.titre}</h4></li>
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
            {data.checked === true ? 'Actif' : 'Inactif'}</p>
          </li>
        </ul>
        <ul className="infos">
          <li className="box-points"><span>{data.points}</span> points</li>
        </ul>
      </div>
    )
  }
}

export default BoxRecompense
