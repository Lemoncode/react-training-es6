# 01 Login

We will take as startup point sample _00 Boilerplate_.

In this sample we are going to implement a Login component with React.

Summary steps:

- [babel-plugin-transform-object-rest-spread](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-object-rest-spread) to use object spread operator.
- Build login component.
- Interact with fake API.
- Login notification displaying on success or fail.

## Steps to build it

- Let's install babel-plugin-transform-object-rest-spread to work with object spread operator:

 ```
 npm install babel-plugin-transform-object-rest-spread --save-dev
 ```

- Now, we have to add a babel configuration file:

### .babelrc
```diff
{
  "presets": [
    "env",
    "react",
  ],
+ "plugins": [
+   "transform-object-rest-spread"
+ ]
}

```

- Delete _./src/hello.jsx_ and _./src/helloStyles.css_ files.

- Create a first version of _Login page_:

### ./src/pages/login/page.jsx
```javascript
import * as React from 'react';

export const LoginPage = () => {
  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default">
          <div>Header Component</div>
          <div>Form Component</div>
        </div>
      </div>
    </div>
  );
};

```

- Create _./src/app.jsx_ file like App entry point where calls to pages:

### ./src/appStyles.css
```css
.app {
  margin-top: 20px;
}

```

### ./src/app.jsx
```javascript
import * as React from 'react';
import {LoginPage} from './pages/login/page';
import classNames from './appStyles';

export const App = () => {
  return (
    <div className={`container-fluid ${classNames.app}`}>
     <LoginPage />
    </div>
  );
}

```

- Update _./src/index.jsx_ to use App component:

### ./src/index.jsx
```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
- import {HelloComponent} from './hello';
+ import {App} from './app';

ReactDOM.render(
-  <HelloComponent />,
+  <App />,
  document.getElementById('root'),
);

```

- Now, we can start to implement Login Header like:

### ./src/pages/login/components/header.jsx
```javascript
import * as React from 'react';

export const HeaderComponent = () => {
  return (
    <div className="panel-heading">
      <h3 className="panel-title">
        <p>Please sign in</p>
        <p>(login: admin / pwd: test)</p>
      </h3>
    </div>
  );
};

```

- And using it in LoginPage

### ./src/pages/login/page.jsx
```diff
import * as React from 'react';
+ import {HeaderComponent} from './components/header';

export const LoginPage = () => {
  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default">
-            <div>Header Component</div>
+            <HeaderComponent />
          <div>Form Component</div>
        </div>
      </div>
    </div>
  );
};

```

- We need a model to bind to our login form like:

### ./src/models/loginCredentials.js
```javascript
export class LoginCredentials {
  login: string;
  password: string;

  constructor() {
    this.login = '';
    this.password = '';
  }
}

```

- And build our _Form Component_:

### ./src/pages/login/components/form.jsx
```javascript
import * as React from 'react';

export const FormComponent = (props) => {
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

FormComponent.propTypes = {
  loginCredentials: React.PropTypes.shape({
    login: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
  }).isRequired,
  updateLoginInfo: React.PropTypes.func.isRequired,
}

```

- Now it's time to give state to our **Login Page** and pass properties to **FormComponent**:

### ./src/pages/login/page.jsx
```diff
import * as React from 'react';
+ import {LoginCredentials} from '../../models/loginCredentials';
import {HeaderComponent} from './components/header';
+ import {FormComponent} from './components/form';

- export const LoginPage = () => {
+ export class LoginPage extends React.Component {  
+   constructor() {
+     super();
+      
+     this.state = {
+       loginCredentials: new LoginCredentials(),
+     };
+   }
+
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
+   updateLoginInfo(fieldName, value) {
+     this.setState({
+       loginCredentials: {
+         ...this.state.loginCredentials,
+         [fieldName]: value,
+       },
+     });
+   }
+
+   render() {
      return (
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <HeaderComponent />
-              <div>Form Component</div>
+              <FormComponent
+                loginCredentials={this.state.loginCredentials}
+                updateLoginInfo={this.updateLoginInfo.bind(this)}
+              />
            </div>
          </div>
        </div>
      );
  }
};

```

- Before we will continue with connecting Login Component with API, we can refactor login form, to apply DRY principle:

### ./src/common/components/form/input.jsx

```javascript
import * as React from 'react';

export const InputComponent = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

InputComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
}

```

- Now, we can reuse InputComponent:

### ./src/pages/login/components/form.jsx
```diff
import * as React from 'react';
+ import {InputComponent} from '../../../common/components/form/input';

export const FormComponent = (props) => {
  const updateLoginInfo = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    props.updateLoginInfo(fieldName, value);
  };

  return (
    <div className="panel-body">
      <form role="form">
-        <div className="form-group">
-          <label htmlFor="login">
-            Login
-          </label>
-          <input
-            type="text"
-            className="form-control"
-            placeholder="Login"
-            name="login"
-            value={props.loginCredentials.login}
-            onChange={updateLoginInfo.bind(this)}
-          />
-        </div>
+        <InputComponent
+          label="Login"
+          type="text"
+          name="login"
+          placeholder="Login"
+          value={props.loginCredentials.login}
+          onChange={updateLoginInfo.bind(this)}
+        />
-        <div className="form-group">
-          <label htmlFor="password">
-            Password
-          </label>
-          <input
-            type="password"
-            className="form-control"
-            placeholder="Password"
-            name="password"
-            value={props.loginCredentials.password}
-            onChange={updateLoginInfo.bind(this)}
-          />
-        </div>
+        <InputComponent
+          label="Password"
+          type="password"
+          name="password"
+          placeholder="Password"
+          value={props.loginCredentials.password}
+          onChange={updateLoginInfo.bind(this)}
+        />
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

FormComponent.propTypes = {
  loginCredentials: React.PropTypes.shape({
    login: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
  }).isRequired,
  updateLoginInfo: React.PropTypes.func.isRequired,
}

```

## Create fake API

- Create mock data:

### ./src/rest-api/login/loginMockData.js
```javascript
export const userProfiles = [
  {
    id: 1, login: 'admin', fullname: 'Admin', role: 'admin',
  },
];

```

### ./src/rest-api/login/loginAPI.js
```javascript
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

```

- Now, we can request login in LoginPage using this API:

### ./src/pages/login/page.jsx
```diff
import * as React from 'react';
+ import * as toastr from 'toastr';
+ import {loginAPI} from '../../rest-api/login/loginAPI';
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

  updateLoginInfo(fieldName, value) {
    this.setState({
      loginCredentials: {
        ...this.state.loginCredentials,
        [fieldName]: value,
      },
    });
  }

+  loginRequest(loginCredentials) {
+    toastr.remove();
+    loginAPI.login(loginCredentials)
+      .then((userProfile) => {
+        toastr.success(`Success login ${userProfile.fullname}`);
+      })
+      .catch((error) => {
+        toastr.error(error);
+      });
+  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <HeaderComponent />
            <FormComponent
              loginCredentials={this.state.loginCredentials}
              updateLoginInfo={this.updateLoginInfo.bind(this)}
+             loginRequest={this.loginRequest.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
};

```

- And update form to has loginRequest property:

### ./src/pages/login/components/form.jsx
```diff
import * as React from 'react';
import {InputComponent} from '../../../common/components/input';

export const FormComponent = (props) => {
  const updateLoginInfo = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    props.updateLoginInfo(fieldName, value);
  };

+  const loginRequest = (event) => {
+    event.preventDefault();
+    props.loginRequest(props.loginCredentials);
+  };

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
+         onClick={loginRequest.bind(this)}
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
+ loginRequest: React.PropTypes.func.isRequired,
}

```

- Finally, we can go one step over, and create a wrapper to keep LoginPage as stateless component:

### ./src/pages/login/page.jsx
```diff
import * as React from 'react';
- import * as toastr from 'toastr';
- import {loginAPI} from '../../rest-api/login/loginAPI';
- import {LoginCredentials} from '../../models/loginCredentials';
import {HeaderComponent} from './components/header';
import {FormComponent} from './components/form';

- export class LoginPage extends React.Component {
+ export const LoginPage = (props) => {  
-  constructor() {
-    super();
-
-    this.state = {
-      loginCredentials: new LoginCredentials(),
-    };
-  }

-  updateLoginInfo(fieldName, value) {
-    this.setState({
-      loginCredentials: {
-        ...this.state.loginCredentials,
-        [fieldName]: value,
-      }
-    });
-  }

-  loginRequest(loginCredentials) {
-    toastr.remove();
-    loginAPI.login(loginCredentials)
-      .then((userProfile) => {
-        toastr.success(`Success login ${userProfile.fullname}`);
-      })
-      .catch((error) => {
-        toastr.error(error);
-      });
-  }

-  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <HeaderComponent />
            <FormComponent
-             loginCredentials={this.state.loginCredentials}
+             loginCredentials={props.loginCredentials}
-             updateLoginInfo={this.updateLoginInfo.bind(this)}
+             updateLoginInfo={props.updateLoginInfo}
-             loginRequest={this.loginRequest.bind(this)}
+             loginRequest={props.loginRequest}
            />
          </div>
        </div>
      </div>
    );
-  }
};

+ LoginPage.propTypes = {
+   loginCredentials: React.PropTypes.shape({
+     login: React.PropTypes.string.isRequired,
+     password: React.PropTypes.string.isRequired,
+   }).isRequired,
+   updateLoginInfo: React.PropTypes.func.isRequired,
+   loginRequest: React.PropTypes.func.isRequired,
+}

```

- And LoginPageContainer is the responsible about state and pass properties to LoginPage:

### ./src/pages/login/components/pageContainer.jsx
```javascript
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

```

- And of course, calls LoginPageContainer instead LoginPage in App component:

### ./src/app.jsx
```javascript
import * as React from 'react';
- import {LoginPage} from './pages/login/page';
+ import {LoginPageContainer} from './pages/login/pageContainer';
import classNames from './appStyles';

export const App = () => {
  return (
    <div className={`container-fluid ${classNames.app}`}>
-     <LoginPage />
+     <LoginPageContainer />
    </div>
  );
}

```
