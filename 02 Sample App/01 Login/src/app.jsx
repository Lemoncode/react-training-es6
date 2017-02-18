import * as React from 'react';
import {LoginPage} from './pages/login/page';
import classNames from './appStyles';

export const App = () => {
  return (
    <div className={`container-fluid ${classNames.app}`}>
     <LoginPage />
    </div>
  );
}
