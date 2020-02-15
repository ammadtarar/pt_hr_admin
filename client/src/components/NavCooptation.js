import React from 'react'
import { NavLink } from 'react-router-dom'

export class NavCooptation extends React.Component {
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

export default NavCooptation;
