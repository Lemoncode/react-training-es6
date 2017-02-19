import * as React from 'react';
import {connect} from 'react-redux';
import {loginContentChangedAction} from './actions/loginContentChanged';
import {loginRequestAction} from './actions/loginRequest';
import {LoginPage} from './page';

const mapStateToProps = (state) => ({
  loginCredentials: state.login.loginCredentials,
});

const mapDispatchToProps = (dispatch) => ({
  updateLoginInfo: (fieldName, value) =>
    dispatch(loginContentChangedAction(fieldName, value)),
  loginRequest: (loginCredentials) =>
    dispatch(loginRequestAction(loginCredentials)),
});

export const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
