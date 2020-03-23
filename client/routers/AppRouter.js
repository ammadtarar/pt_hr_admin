import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Communication from '../pages/Communication'
import Cooptation from '../pages/Cooptation'
import Recompenses from '../pages/Recompenses'

function AppRouter(props) {
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
          localStorage.getItem('utilisateur') ?
            <Switch>
              <Route exact path="/" render={() => window.location.href = '/dashboard'}/>
              {userRoutes
                .filter((item) => { return item.path !== '/' })
                .map(route => (
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
  )
}

export default AppRouter
