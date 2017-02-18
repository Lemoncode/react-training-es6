import * as React from 'react';
import * as toastr from 'toastr';
import {loginAPI} from '../../rest-api/login/loginAPI';
import {LoginCredentials} from '../../models/loginCredentials';
import {LoginPage} from './page';

export class LoginPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      loginCredentials: new LoginCredentials(),
    };
  }

  // Other way to assign new object to loginCredentials to avoid mutation is:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  /*
    var newLoginCredentiasl = Object.assign({}, this.state.loginCredentials, {
      [fieldName]: value,
    });
  */
  // We are use a JavaScript proposal named object spread operator
  // https://github.com/sebmarkbage/ecmascript-rest-spread
  // http://stackoverflow.com/questions/32925460/spread-operator-vs-object-assign
  updateLoginInfo(fieldName, value) {
    this.setState({
      loginCredentials: {
        ...this.state.loginCredentials,
        [fieldName]: value,
      },
    });
  }

  loginRequest(loginCredentials) {
    toastr.remove();
    loginAPI.login(loginCredentials)
      .then((userProfile) => {
        toastr.success(`Success login ${userProfile.fullname}`);
      })
      .catch((error) => {
        toastr.error(error);
      });
  }

  render() {
    return (
      <LoginPage
        loginCredentials={this.state.loginCredentials}
        updateLoginInfo={this.updateLoginInfo.bind(this)}
        loginRequest={this.loginRequest.bind(this)}
      />
    );
  }
}
