import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './Root.css';

// Components
import App from './App';
import Signup from './Signup';
import Login from './Login';

class Root extends Component {
  render() {
    return (
      <div className="Root">
        <Route exact path="/" component={App} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default Root;
