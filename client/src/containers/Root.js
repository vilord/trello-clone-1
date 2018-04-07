import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './Root.css';

// Components
import App from './App';
import Signup from './Signup';
import Login from './Login';

// FontAwesome Config
import fontawesome from '@fortawesome/fontawesome'
import faCog from '@fortawesome/fontawesome-free-solid/faCog';
fontawesome.library.add(faCog);

class Root extends Component {
  render() {
    return (
      <div className="Root">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    );
  }
}

export default Root;
