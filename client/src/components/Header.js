import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { NavLink } from 'react-router-dom'

export class Header extends React.Component {
  state = {profileOpen: false}

  preventDragHandler = (e) => {
    e.preventDefault()
  }

  toggleProfileMenu(e) {
    this.setState({
      profileOpen: !this.state.profileOpen
    })
  }

  deconnexion(e) {
    this.props.logout()
    window.location.href = '/'
    localStorage.setItem('utilisateur', '')
  }

  render() {
    return (
      <header onDragStart={(e) => this.preventDragHandler(e)}>
        <div className="container">
          <div className="logo"><a href="/dashboard" rel="noopener noreferrer" title=""><img type="image/svg+xml" src="/icons/logo-pushtalents-small.svg" alt=""/></a></div>
          <nav className="primary" role="navigation">
            <ul>
              <li className={`dashboard ${document.location.pathname === '/dashboard' ? 'current' : ''}`}><NavLink to="/dashboard" activeClassName="is-active" exact={true}>Tableau de bord</NavLink></li>
              <li className={`cooptation ${document.location.pathname === '/cooptation' ? 'current' : ''}`}><NavLink to="/cooptation" activeClassName="is-active" exact={true}>Cooptation</NavLink></li>
              <li className={`communication ${document.location.pathname === '/communication' ? 'current' : ''}`}><NavLink to="/communication" activeClassName="is-active" exact={true}>Communication</NavLink></li>
              <li className={`recompenses ${document.location.pathname === '/recompenses' ? 'current' : ''}`}><NavLink to="/recompenses" activeClassName="is-active" exact={true}>Récompenses</NavLink></li>
            </ul>
          </nav>
          <ul className="profile">
            <li onClick={(e) => this.toggleProfileMenu(e)} className={this.state.profileOpen === false ? 'open' : ''}><span>Sébastien</span>
              <ul className={`sub-menu ${this.state.profileOpen === false ? 'open' : ''}`}>
                <li onClick={(e) => this.deconnexion(e)}>Se déconnecter</li>
              </ul>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: (loginStatus) => dispatch(logout())
})

export default connect(undefined, mapDispatchToProps)(Header)
