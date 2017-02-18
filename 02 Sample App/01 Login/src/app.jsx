import * as React from 'react';
import {LoginPage} from './pages/login/page';
const classNames: any = require('./appStyles');

export const App = () => {
  return (
    <div className={`container-fluid ${classNames.app}`}>
     <LoginPage />
    </div>
  );
}
