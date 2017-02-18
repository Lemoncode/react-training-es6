import * as React from 'react';
import {LoginCredentials} from '../../../models/loginCredentials';

interface Props {
  loginCredentials: LoginCredentials;
  updateLoginInfo: (fieldName: string, value: string) => void;
}

export const FormComponent = (props: Props) => {
  const updateLoginInfo = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    props.updateLoginInfo(fieldName, value);
  };

  return (
    <div className="panel-body">
      <form role="form">
        <div className="form-group">
          <label htmlFor="login">
            Login
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Login"
            name="login"
            value={props.loginCredentials.login}
            onChange={updateLoginInfo.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={props.loginCredentials.password}
            onChange={updateLoginInfo.bind(this)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success btn-block"
        >
          Login
        </button>
      </form>
    </div>
  );
};
