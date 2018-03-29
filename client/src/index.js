import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import Root from './containers/Root';

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={Root} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
