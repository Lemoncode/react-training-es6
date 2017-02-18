# 02 Navigation

We will take as startup point sample _01 Login_.

In this sample we will start using React-Router (SPA navigation).

Summary steps:

- Define routes.
- Update components.
- Navigate from LoginPage to a blank list page.

## Steps to build it

- We will start to define route constants file:

### ./src/common/constants/routeConstants.js
```javascript
export const routeConstants = {
  default: '/',
};

```

- And now create AppRoutes component where we can define which route maps to component:

### ./src/routes.jsx
```javascript
import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routeConstants} from './common/constants/routeConstants';
import {App} from './app';
import {LoginPageContainer} from './pages/login/pageContainer';

export const AppRoutes = (
  <Route path={routeConstants.default} component={App}>
    <IndexRoute component={LoginPageContainer} />
  </Route>
);

```

- Due to we are render LoginPageContainer inside App component via React-Router, we need to update App component:

### ./src/app.jsx
```diff
import * as React from 'react';
- import {LoginPageContainer} from './pages/login/pageContainer';
import classNames from './appStyles';

// With this.props.children we are placing App children components
// where we want to render it.
- export const App = () => {
+ export class App extends React.Component {
+   render() {
      return (
        <div className={`container-fluid ${classNames.app}`}>
-         <LoginPageContainer />
+         {this.props.children}
        </div>
      );
+   }
}

```

- And finally, we only need to update _index.jsx_ entry point:

### ./src/index.jsx
```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
- import {App} from './app';
+ import {Router, hashHistory} from 'react-router';
+ import {AppRoutes} from './routes';

ReactDOM.render(
-  <App />,
+  <Router history={hashHistory} routes={AppRoutes} />,
  document.getElementById('root'),
);

```

- Now, we are going to create a blank component to simulate a navigation after login:

### ./src/pages/training/list/page.jsx
```javascript
import * as React from 'react';

export const TrainingListPage = () => {
  return (
    <div>Training list</div>
  );
}

```

- For navigate to this component we are define a new route:

### ./src/common/constants/routeConstants.js
```diff
+ const trainingRoute = '/training';

export const routeConstants = {
  default: '/',
+ training: {
+   list: `${trainingRoute}/list`,
+ },
};

```

### ./src/routes.jsx
```diff
import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routeConstants} from './common/constants/routeConstants';
import {App} from './app';
import {LoginPageContainer} from './pages/login/pageContainer';
+ import {TrainingListPage} from './pages/training/list/page';

export const AppRoutes = (
  <Route path={routeConstants.default} component={App}>
    <IndexRoute component={LoginPageContainer} />
+   <Route path={routeConstants.training.list} component={TrainingListPage} />
  </Route>
);

```

- Lastly, we need to do something to navigate to TrainingListPage component. But instead of using [Link component from React-Router](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/03-navigating-with-link) we need navigate after check loginCredentials:

### ./src/pages/login/pageContainer.jsx
```javascript
import * as React from 'react';
import * as toastr from 'toastr';
+ import {hashHistory} from 'react-router';
+ import {routeConstants} from '../../common/constants/routeConstants';
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
+       hashHistory.push(routeConstants.training.list);
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

```
