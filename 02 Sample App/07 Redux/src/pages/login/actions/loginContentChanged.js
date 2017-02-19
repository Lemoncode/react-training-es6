import {loginActionConstants} from '../../../common/constants/actionConstants/loginActionConstants';

export const loginContentChangedAction = (fieldName, value) => ({
  type: loginActionConstants.LOGIN_CONTENT_CHANGED,
  payload: {
    fieldName,
    value,
  },
});
