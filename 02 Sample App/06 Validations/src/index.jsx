import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {AppRoutes} from './routes';

ReactDOM.render(
  <Router history={hashHistory} routes={AppRoutes} />,
  document.getElementById('root'),
);
