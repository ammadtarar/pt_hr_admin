import React from 'react'
import { NavLink } from 'react-router-dom'

export class CooptationNav extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ul className="nav-cooptation">
        <li><NavLink to="/cooptation/candidats">Candidats</NavLink></li>
        <li><NavLink to="/cooptation/annonces">Annonces <span>6</span></NavLink></li>
        <li><NavLink to="/cooptation/candidats-archives">Candidats archivés</NavLink></li>
      </ul>
    )
  }
}

export default CooptationNav;
