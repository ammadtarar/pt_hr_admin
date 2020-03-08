import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

function Header (props) {
  let history = useHistory()
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

  //Navigation header menu left / right
  const nav = (event: KeyboardEvent) => {
    const right = event.key === 'ArrowRight'
    const left = event.key === 'ArrowLeft'
    const location = window.location.pathname

    if (localStorage.getItem('navKeyboard') === 'false' && (left || right)) {
      switch (true) {
        case location === '/dashboard':
          if(right) {
            history.push('/cooptation')
          } else if(left) {
            history.push('/recompenses')
          }
          break
        case location === '/cooptation':
          if(right) {
            history.push('/communication')
          } else if(left) {
            history.push('/dashboard')
          }
          break
        case location === '/communication':
          if(right) {
            history.push('/recompenses')
          } else if(left) {
            history.push('cooptation')
          }
          break
        case location === '/recompenses':
          if(right) {
            history.push('/dashboard')
          } else if(left) {
            history.push('communication')
          }
          break
        default:
      }
      localStorage.setItem('navKeyboard', true)
    }
  }

  useEffect(() => {
    localStorage.setItem('navKeyboard', false)
    return () => {
      document.addEventListener('keydown', nav, true)
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

export default Header
