import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, matchPath } from 'react-router-dom';
import Aside from '../components/Aside';
import Accueil from '../components/Accueil';

const userRoutes = [
  {
    path: '/',
    component: Accueil
  }
]

export class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
          )}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({auth: {loginStatus}}) => ({
  loginStatus
});

export default connect(mapStateToProps)(AppRouter);
