import * as React from 'react';
import {LoginPageContainer} from './pages/login/pageContainer';
import classNames from './appStyles';

export const App = () => {
  return (
    <div className={`container-fluid ${classNames.app}`}>
     <LoginPageContainer />
    </div>
  );
}
