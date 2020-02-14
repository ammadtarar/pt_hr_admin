import React from 'react'
import { connect } from 'react-redux'
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Cooptation from '../pages/Cooptation'

export class AppRouter extends React.Component {
  constructor () {
    super()
  }

  render() {
    const userRoutes = [
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
      }
    ]

    return (
      <BrowserRouter>
        <Route
          exact
          render={() => (
            <Switch>
              {userRoutes.map(route => (
                <Route key={route.path} exact path={route.path} component={route.component} />
              ))}
            </Switch>
            )
          }
        />
      </BrowserRouter>
    );
  }
}

export default AppRouter;
