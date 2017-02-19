import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
import {loginAPI} from '../../../rest-api/login/loginAPI';
import {loginActionConstants} from '../../../common/constants/actionConstants/loginActionConstants';
import {routeConstants} from '../../../common/constants/routeConstants';

export const loginRequestAction = (loginCredentials) => {
  return (dispatcher) => {
    const promise = loginAPI.login(loginCredentials);
    toastr.remove();

    promise.then((userProfile) => {
      toastr.success(`Success login ${userProfile.fullname}`);
      hashHistory.push(routeConstants.training.list);
    })
    .catch((error) => {
      toastr.error(error);
    });

    return promise;
  };
};
