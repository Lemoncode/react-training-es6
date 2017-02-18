import * as React from 'react';
import {HeaderComponent} from './components/header';
import {FormComponent} from './components/form';

export const LoginPage = (props) => {
  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default">
          <HeaderComponent />
          <FormComponent
            loginCredentials={props.loginCredentials}
            updateLoginInfo={props.updateLoginInfo}
            loginRequest={props.loginRequest}
          />
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  loginCredentials: React.PropTypes.shape({
    login: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
  }).isRequired,
  updateLoginInfo: React.PropTypes.func.isRequired,
  loginRequest: React.PropTypes.func.isRequired,
}
