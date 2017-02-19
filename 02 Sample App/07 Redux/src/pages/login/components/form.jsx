import * as React from 'react';
import {InputComponent} from '../../../common/components/form/input';

export const FormComponent = (props) => {
  const updateLoginInfo = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    props.updateLoginInfo(fieldName, value);
  };

  const loginRequest = (event) => {
    event.preventDefault();
    props.loginRequest(props.loginCredentials);
  };

  return (
    <div className="panel-body">
      <form role="form">
        <InputComponent
          label="Login"
          type="text"
          name="login"
          placeholder="Login"
          value={props.loginCredentials.login}
          onChange={updateLoginInfo.bind(this)}
        />
        <InputComponent
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={props.loginCredentials.password}
          onChange={updateLoginInfo.bind(this)}
        />
        <button
          type="submit"
          className="btn btn-lg btn-success btn-block"
          onClick={loginRequest.bind(this)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

FormComponent.propTypes = {
  loginCredentials: React.PropTypes.shape({
    login: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
  }).isRequired,
  updateLoginInfo: React.PropTypes.func.isRequired,
  loginRequest: React.PropTypes.func.isRequired,
}
