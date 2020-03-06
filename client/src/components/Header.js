import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { NavLink } from 'react-router-dom'

function Header (props) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [utilisateur, setUtilisateur] = useState(localStorage.getItem('utilisateur') ? JSON.parse(localStorage.getItem('utilisateur')) : '')

  const preventDragHandler = e => {
    e.preventDefault()
  }

  const toggleProfileMenu = e => {
    setProfileOpen(!profileOpen)
  }

  const deconnexion = e => {
    props.logout()
    window.location.href = '/'
    localStorage.clear()
  }

  //Fermer sub-menu au clique sur document ou ESC
  const closeSubMenu = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setProfileOpen(false)
    }
    setProfileOpen(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', closeSubMenu, true)
    document.addEventListener('click', closeSubMenu, true)
    return () => {
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
            <li className={`dashboard ${document.location.pathname === '/dashboard' ? 'current' : ''}`}><NavLink to="/dashboard" activeClassName="is-active" exact={true}><div>Tableau de bord</div></NavLink></li>
            <li className={`cooptation ${document.location.pathname === '/cooptation' ? 'current' : ''}`}><NavLink to="/cooptation" activeClassName="is-active" exact={true}><div>Cooptation</div></NavLink></li>
            <li className={`communication ${document.location.pathname === '/communication' ? 'current' : ''}`}><NavLink to="/communication" activeClassName="is-active" exact={true}><div>Communication</div></NavLink></li>
            <li className={`recompenses ${document.location.pathname === '/recompenses' ? 'current' : ''}`}><NavLink to="/recompenses" activeClassName="is-active" exact={true}><div>Récompenses</div></NavLink></li>
          </ul>
        </nav>
        <ul className="profile">
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

function mapDispatchToProps(dispatch) {
  return { logout: (loginStatus) => dispatch(logout()) }
}

export default connect(undefined, mapDispatchToProps)(Header)
