import React, { Fragment } from 'react';
import decode from "jwt-decode";
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";
import {store} from "./store/index";
import { setCurrentUser, addError,setToken} from './store/actions';
import RouteViews from './containers/RouteViews'
import Navbars from './containers/Navbars'

if(localStorage.jwtToken){
  setToken(localStorage.jwtToken);

  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));

  } catch (error) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(error))
  }
}

const App =() =>(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbars />
        <RouteViews />
      </Fragment>
    </Router>
  </Provider>
)

export default App;