import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import 'foundation-sites/dist/css/foundation-float.min.css'
import './styles/styles.scss'
import * as serviceWorker from './serviceWorker'

const store = configureStore()

const App = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
