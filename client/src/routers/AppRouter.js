import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Communication from '../pages/Communication'
import Cooptation from '../pages/Cooptation'
import Recompenses from '../pages/Recompenses'

import Test from '../pages/test'

export class AppRouter extends React.Component {
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
