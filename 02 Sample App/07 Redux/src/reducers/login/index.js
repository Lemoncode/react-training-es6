import {LoginCredentials} from '../../models/loginCredentials';
import {loginActionConstants} from '../../common/constants/actionConstants/loginActionConstants';

class LoginState {
  loginCredentials;

  constructor() {
    this.loginCredentials = new LoginCredentials();
  }
}

export const loginReducer = (state = new LoginState(), action) => {
  switch (action.type) {
    case loginActionConstants.LOGIN_CONTENT_CHANGED:
      return handleLoginContentChanged(state, action.payload);
    default:
      return state;
  }
};

const handleLoginContentChanged = (state, payload) => ({
  ...state,
  loginCredentials: {
    ...state.loginCredentials,
    [payload.fieldName]: payload.value,
  },
});
