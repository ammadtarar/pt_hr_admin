import React from 'react'
import { NavLink } from 'react-router-dom'
import Switch from 'react-switch'

export class CardCommunication extends React.Component {
  constructor() {
    super()
    this.state = { checked: false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(checked) {
    this.setState({ checked })
  }

  render() {
    return (
      <div className="card-communication">
        <div className="box-thumbnail">
          <div className="box-views-small"><span>243</span></div>
        </div>
        <h4>Comment mettre en avant vos compétences en langues ?</h4>
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
      </div>
    )
  }
}

export default CardCommunication;
