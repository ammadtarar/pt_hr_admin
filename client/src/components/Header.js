import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { NavLink } from 'react-router-dom'

export class Header extends React.Component {
  state = {
    profileOpen: false,
    utilisateur: localStorage.getItem('utilisateur') ? JSON.parse(localStorage.getItem('utilisateur')) : ''
  }

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
    localStorage.clear()
  }

  render() {
    return (
      <header onDragStart={(e) => this.preventDragHandler(e)}>
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
            <li onClick={(e) => this.toggleProfileMenu(e)}
                className={this.state.profileOpen === true ? 'open' : ''}><span>{this.state.utilisateur.prenom}</span>
              <ul className={`sub-menu ${this.state.profileOpen === true ? 'open' : ''}`}>
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
