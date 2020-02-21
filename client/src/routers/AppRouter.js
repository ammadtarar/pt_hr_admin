import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from '../actions/auth'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Communication from '../pages/Communication'
import Cooptation from '../pages/Cooptation'
import Recompenses from '../pages/Recompenses'

import Test from '../pages/test'

export class AppRouter extends React.Component {
  state = {
    login: false
  }

  componentWillReceiveProps(nextProps) {
    const { loginStatus } = nextProps
    if (loginStatus === true) {
      this.setState({login: true})
    }
  }

  render() {
    const userRoutes = [
      {
        path: '/test',
        component: Test
      },
      {
        path: '/',
        component: Login
      },
      {
        path: '/dashboard',
        component: Dashboard
      },
      {
        path: '/cooptation',
        component: Cooptation
      },
      {
        path: '/communication',
        component: Communication
      },
      {
        path: '/recompenses',
        component: Recompenses
      }
    ]

    return (
      <BrowserRouter>
        <Route
          exact
          render={() => (
            this.state.login === true || localStorage.getItem('utilisateur') ?
              <Switch>
                {userRoutes.map(route => (
                  <Route key={route.path} exact path={route.path} component={route.component} />
                ))}
              </Switch>
              :
              <Switch>
                <Route key="/" exact path="/" component={Login} />
                <Route path="*" exact component={Login} />
              </Switch>
            )
          }
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({auth: {loginStatus}}) => ({
  loginStatus
})

export default connect(mapStateToProps)(AppRouter)
