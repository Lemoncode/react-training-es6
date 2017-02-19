import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Company from './company';

let name = 1;

ReactDOM.render(
  <Company name={name} />,
  document.getElementById('root')
);
