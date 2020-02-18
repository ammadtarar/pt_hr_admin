import React from 'react'
import { NavLink } from 'react-router-dom'
const data = require('../datas.json')

function NavCooptation() {
  return (
    <ul className="nav-cooptation">
      <li><NavLink to="/cooptation/candidats">Candidats</NavLink></li>
      <li><NavLink to="/cooptation/annonces">Annonces <span>{Object.keys(data.annonces).length}</span></NavLink></li>
      <li><NavLink to="/cooptation/candidats-archives">Candidats archivés</NavLink></li>
    </ul>
  )
}

export default NavCooptation;
