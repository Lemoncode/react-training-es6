import * as React from 'react';
import {LoginCredentials} from '../../models/loginCredentials';
import {HeaderComponent} from './components/header';
import {FormComponent} from './components/form';

export class LoginPage extends React.Component {
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <HeaderComponent />
              <FormComponent
                loginCredentials={this.state.loginCredentials}
                updateLoginInfo={this.updateLoginInfo.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
