# 01 Login

We will take as startup point sample _00 Boilerplate_.

In this sample we are going to implement a Login component with React.

Summary steps:

- Build login component.
- Interact with fake API.
- Login notification displaying on success or fail.

## Steps to build it

- Delete _./src/hello.tsx_ and _./src/helloStyles.css_ files.

- Create a first version of _Login page_:

### ./src/pages/login/page.tsx
```javascript
import * as React from 'react';

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div>Header Component</div>
            <div>Form Component</div>
          </div>
        </div>
      </div>
    </div>
  );
};

```

- Create _./src/app.tsx_ file like App entry point where calls to pages:

### ./src/appStyles.css
```css
.app {
  margin-top: 20px;
}

```

### ./src/app.tsx
```javascript
import * as React from 'react';
import {LoginPage} from './pages/login/page';
const classNames: any = require('./appStyles');

export const App = () => {
  return (
    <div className={`container-fluid ${classNames.app}`}>
     <LoginPage />
    </div>
  );
}

```

- Update _./src/index.tsx_ to use App component:

### ./src/index.tsx
```javascript
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

### ./src/pages/login/components/header.tsx
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

### ./src/pages/login/page.tsx
```javascript
import * as React from 'react';
+ import {HeaderComponent} from './components/header';

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
-            <div>Header Component</div>
+            <HeaderComponent />
            <div>Form Component</div>
          </div>
        </div>
      </div>
    </div>
  );
};

```

- We need a model to bind to our login form like:

### ./src/models/loginCredentials.ts
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

### ./src/pages/login/components/form.tsx
```javascript
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

```

- Now it's time to give state to our **Login Page** and pass properties to **FormComponent**:

### ./src/pages/login/page.tsx
```javascript
import * as React from 'react';
+ import {LoginCredentials} from '../../models/loginCredentials';
import {HeaderComponent} from './components/header';
+ import {FormComponent} from './components/form';

+ interface State {
+   loginCredentials: LoginCredentials;
+ }

- export const LoginPage = () => {
+ export class LoginPage extends React.Component <{}, State> {  
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
+   private updateLoginInfo(fieldName: string, value: string) {
+     this.setState({
+       loginCredentials: {
+         ...this.state.loginCredentials,
+         [fieldName]: value,
+       }
+     });
+   }
+
+   public render() {
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

### ./src/common/components/form/input.tsx

```javascript
import * as React from 'react';

interface Props {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: any;
}

export const InputComponent = (props: Props) => {
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
}

```

- Now, we can reuse InputComponent:

### ./src/pages/login/components/form.tsx
```javascript
import * as React from 'react';
import {LoginCredentials} from '../../../models/loginCredentials';
+ import {InputComponent} from '../../../common/components/input';

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
```

## Create fake API

- First we are going to create UserProfile model:

### ./src/models/userProfile.ts
```javascript
export class UserProfile {
  id: number;
  login: string;
  fullname: string;
  role: string;

  constructor() {
    this.id = 0;
    this.login = '';
    this.fullname = '';
    this.role = '';
  }
}

```

- Create mock data:

### ./src/rest-api/login/loginMockData.ts
```javascript
import {UserProfile} from '../../models/userProfile';

export const userProfiles: UserProfile[] = [
  {
    id: 1, login: 'admin', fullname: 'Admin', role: 'admin',
  },
];

```

### ./src/rest-api/login/loginAPI.ts
```javascript
import {LoginCredentials} from '../../models/loginCredentials';
import {UserProfile} from '../../models/userProfile';
import {userProfiles} from './loginMockData';

// Fake API using es6 Promises polyfill (with core-js).
// In future, we can replace by real one.
class LoginAPI {
  public login(loginCredentials: LoginCredentials): Promise<UserProfile> {
    let userProfile = userProfiles.find((userProfile) => {
      return userProfile.login === loginCredentials.login;
    });

    if (!userProfile || loginCredentials.password !== 'test') {
      return Promise.reject<UserProfile>('Invalid login or password');
    }

    return Promise.resolve(userProfile);
  }
}

export const loginAPI = new LoginAPI();

```

- Now, we can request login in LoginPage using this API:

### ./src/pages/login/page.tsx
```javascript
import * as React from 'react';
+ import * as toastr from 'toastr';
+ import {loginAPI} from '../../rest-api/login/loginAPI';
import {LoginCredentials} from '../../models/loginCredentials';
+ import {UserProfile} from '../../models/userProfile';
import {HeaderComponent} from './components/header';
import {FormComponent} from './components/form';

interface State {
  loginCredentials: LoginCredentials;
}

export class LoginPage extends React.Component <{}, State> {
  constructor() {
    super();

    this.state = {
      loginCredentials: new LoginCredentials(),
    };
  }

  private updateLoginInfo(fieldName: string, value: string) {
    this.setState({
      loginCredentials: {
        ...this.state.loginCredentials,
        [fieldName]: value,
      }
    });
  }

+  private loginRequest(loginCredentials: LoginCredentials) {
+    toastr.remove();
+    loginAPI.login(loginCredentials)
+      .then((userProfile: UserProfile) => {
+        toastr.success(`Success login ${userProfile.fullname}`);
+      })
+      .catch((error) => {
+        toastr.error(error);
+      });
+  }

  public render() {
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

### ./src/pages/login/components/form.tsx
```javascript
import * as React from 'react';
import {LoginCredentials} from '../../../models/loginCredentials';
import {InputComponent} from '../../../common/components/input';

interface Props {
  loginCredentials: LoginCredentials;
  updateLoginInfo: (fieldName: string, value: string) => void;
+ loginRequest: (loginCredentials: LoginCredentials) => void;
}

export const FormComponent = (props: Props) => {
  const updateLoginInfo = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    props.updateLoginInfo(fieldName, value);
  };

+  const loginRequest = (event) => {
+    event.preventDefault();
+    props.loginRequest(props.loginCredentials);
+  }

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

```

- Finally, we can go one step over, and create a wrapper to keep LoginPage as stateless component:

### ./src
```javascript
import * as React from 'react';
- import * as toastr from 'toastr';
- import {loginAPI} from '../../rest-api/login/loginAPI';
import {LoginCredentials} from '../../models/loginCredentials';
- import {UserProfile} from '../../models/userProfile';
import {HeaderComponent} from './components/header';
import {FormComponent} from './components/form';

- interface State {
+ interface Props {
  loginCredentials: LoginCredentials;
+ updateLoginInfo: (fieldName: string, value: string) => void;
+ loginRequest: (loginCredentials: LoginCredentials) => void;
}

- export class LoginPage extends React.Component <{}, State> {
+ export const LoginPage = (props: Props) => {  
-  constructor() {
-    super();
-
-    this.state = {
-      loginCredentials: new LoginCredentials(),
-    };
-  }

-  private updateLoginInfo(fieldName: string, value: string) {
-    this.setState({
-      loginCredentials: {
-        ...this.state.loginCredentials,
-        [fieldName]: value,
-      }
-    });
-  }

-  private loginRequest(loginCredentials: LoginCredentials) {
-    toastr.remove();
-    loginAPI.login(loginCredentials)
-      .then((userProfile: UserProfile) => {
-        toastr.success(`Success login ${userProfile.fullname}`);
-      })
-      .catch((error) => {
-        toastr.error(error);
-      });
-  }

-  public render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <HeaderComponent />
            <FormComponent
              loginCredentials={this.state.loginCredentials}
-              updateLoginInfo={this.updateLoginInfo.bind(this)}
-              loginRequest={this.loginRequest.bind(this)}
+              updateLoginInfo={props.updateLoginInfo}
+              loginRequest={props.loginRequest}
            />
          </div>
        </div>
      </div>
    );
-  }
};

```

- And LoginPageContainer is the responsible about state and pass properties to LoginPage:

### ./src/pages/login/components/pageContainer.tsx
```javascript
import * as React from 'react';
import * as toastr from 'toastr';
import {loginAPI} from '../../rest-api/login/loginAPI';
import {LoginCredentials} from '../../models/loginCredentials';
import {UserProfile} from '../../models/userProfile';
import {LoginPage} from './page';

interface State {
  loginCredentials: LoginCredentials;
}

export class LoginPageContainer extends React.Component <{}, State> {
  constructor() {
    super();

    this.state = {
      loginCredentials: new LoginCredentials(),
    };
  }

  private updateLoginInfo(fieldName: string, value: string) {
    this.setState({
      loginCredentials: {
        ...this.state.loginCredentials,
        [fieldName]: value,
      }
    });
  }

  private loginRequest(loginCredentials: LoginCredentials) {
    toastr.remove();
    loginAPI.login(loginCredentials)
      .then((userProfile: UserProfile) => {
        toastr.success(`Success login ${userProfile.fullname}`);
      })
      .catch((error) => {
        toastr.error(error);
      });
  }

  public render() {
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

### ./src/app.tsx
```javascript
import * as React from 'react';
- import {LoginPage} from './pages/login/page';
+ import {LoginPageContainer} from './pages/login/pageContainer';
const classNames: any = require('./appStyles');

export const App = () => {
  return (
    <div className={`container-fluid ${classNames.app}`}>
-     <LoginPage />
+     <LoginPageContainer />
    </div>
  );
}

```
