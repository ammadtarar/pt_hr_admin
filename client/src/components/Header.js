import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  const [profileOpen, setProfileOpen] = useState('false')

  const preventDragHandler = e => {
    e.preventDefault()
  }

  const toggleSubmenu = e => {
    setProfileOpen(!profileOpen)
  }

  return (
    <header  onDragStart={(e) => preventDragHandler(e)}>
      <div className="container">
        <a href="/dashboard" className="logo" rel="noopener noreferrer" title=""><div><img type="image/svg+xml" src="/icons/logo-pushtalents-small.svg" alt=""/></div></a>
        <nav className="primary" role="navigation">
          <ul>
            <li className={`dashboard ${document.location.pathname === '/dashboard' ? 'current' : ''}`}><NavLink to="/dashboard" activeClassName="is-active" exact={true}>Tableau de bord</NavLink></li>
            <li className={`cooptation ${document.location.pathname === '/cooptation' ? 'current' : ''}`}><NavLink to="/cooptation" activeClassName="is-active" exact={true}>Cooptation</NavLink></li>
            <li className={`communication ${document.location.pathname === '/communication' ? 'current' : ''}`}><NavLink to="/communication" activeClassName="is-active" exact={true}>Communication</NavLink></li>
            <li className={`recompenses ${document.location.pathname === '/recompenses' ? 'current' : ''}`}><NavLink to="/recompenses" activeClassName="is-active" exact={true}>Récompenses</NavLink></li>
          </ul>
        </nav>
        <ul className="profile">
          <li className={profileOpen === false ? 'open' : ''}><span onClick={(e) => toggleSubmenu(e)}>Sébastien</span>
            <ul className={`sub-menu ${profileOpen === false ? 'open' : ''}`}>
              <li><NavLink to="/" activeClassName="is-active" exact={true}>Se déconnecter</NavLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
