import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'foundation-sites/dist/css/foundation-float.min.css';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
store.dispatch(logout());

const App = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
