import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../components/Header'
import CooptationNav from '../../components/CooptationNav'
import Switch from 'react-switch'

export class Annonces extends React.Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
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
            <CooptationNav/>
            <div className="box-annonce">
              <p><span className="titre"></span><span className="date"></span></p>
              <ul className="details">
                <li>
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
                </li>
                <li><span>1000</span> €</li>
                <li>New-York</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Annonces;
