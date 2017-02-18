import {userProfiles} from './loginMockData';

// Fake API using es6 Promises polyfill (with babel-preset-env).
// In future, we can replace by real one.
class LoginAPI {
  login(loginCredentials): Promise {
    let userProfile = userProfiles.find((userProfile) => {
      return userProfile.login === loginCredentials.login;
    });

    if (!userProfile || loginCredentials.password !== 'test') {
      return Promise.reject('Invalid login or password');
    }

    return Promise.resolve(userProfile);
  }
}

export const loginAPI = new LoginAPI();
