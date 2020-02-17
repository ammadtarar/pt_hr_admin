import React from 'react'
import { NavLink } from 'react-router-dom'

function NavCooptation() {
  return (
    <ul className="nav-recompense">
      <li><NavLink to="/cooptation/candidats">Recompenses</NavLink></li>
      <li><NavLink to="/cooptation/annonces">Demandes en attente <span>6</span></NavLink></li>
    </ul>
  )
}

export default NavCooptation;
