import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Header (props) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [utilisateur] = useState(localStorage.getItem('utilisateur') ? JSON.parse(localStorage.getItem('utilisateur')) : '')

  const preventDragHandler = e => {
    e.preventDefault()
  }

  const deconnexion = e => {
    window.location.href = '/'
    localStorage.clear() //Clear storage, donc fermer les routes autres '/' sur Approuter
  }

  const toggleProfileMenu = e => {
    setProfileOpen(!profileOpen)
  }

  //Fermer sub-menu au clique sur document ou ESC
  const closeSubMenu = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setProfileOpen(false)
    }
    setProfileOpen(false)
  }

  useEffect(() => {
    localStorage.setItem('countNav', false)
    return () => {
      // document.addEventListener('keydown', accessibility, true)
      document.addEventListener('keydown', closeSubMenu, true)
      document.removeEventListener('click', closeSubMenu, true)
    }
  })

  return (
    <header onDragStart={(e) => preventDragHandler(e)}>
      <div className="container">
        <div className="logo"><a href="/dashboard" rel="noopener noreferrer" title=""><img type="image/svg+xml" src="/icons/logo-pushtalents-small.svg" alt=""/></a></div>
        <nav className="primary" role="navigation">
          <ul>
            <li className={`dashboard ${document.location.pathname === '/dashboard' ? 'current' : ''}`}><NavLink to="/dashboard" activeClassName="is-active" exact={true}><div tabIndex={1}>Tableau de bord</div></NavLink></li>
            <li className={`cooptation ${document.location.pathname === '/cooptation' ? 'current' : ''}`}><NavLink to="/cooptation" activeClassName="is-active" exact={true}><div tabIndex={2}>Cooptation</div></NavLink></li>
            <li className={`communication ${document.location.pathname === '/communication' ? 'current' : ''}`}><NavLink to="/communication" activeClassName="is-active" exact={true}><div tabIndex={3}>Communication</div></NavLink></li>
            <li className={`recompenses ${document.location.pathname === '/recompenses' ? 'current' : ''}`}><NavLink to="/recompenses" activeClassName="is-active" exact={true}><div tabIndex={4}>Récompenses</div></NavLink></li>
          </ul>
        </nav>
        <ul className="profile" tabIndex={5}>
          <li onClick={(e) => toggleProfileMenu(e)}
              className={profileOpen === true ? 'open' : ''}><span>{utilisateur.prenom}</span>
            <ul className={`sub-menu ${profileOpen === true ? 'open' : ''}`}>
              <li onClick={(e) => deconnexion(e)}>Se déconnecter</li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
