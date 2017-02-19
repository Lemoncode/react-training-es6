import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import {store} from './store';
import {AppRoutes} from './routes';

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={AppRoutes} />
  </Provider>,
  document.getElementById('root'),
);
