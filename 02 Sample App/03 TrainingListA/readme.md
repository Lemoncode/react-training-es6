# 03 TrainingListA

We will take as startup point sample _02 Navigation_.

In this sample we will render a table of trainings using HTML table and rows.

Summary steps:

- Define a model entity (Training)
- Define mock data and trainingAPI.
- Build table component.

## Steps to build it

- We will create Training model:

### ./src/common/models/training.js
```javascript
export class Training {
  id: number;
  name: string;
  url: string;
  startDate: number;
  endDate: number;
  isActive: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.url = '';
    this.startDate = 0;
    this.endDate = 0;
    this.isActive = false;
  }
}

```

- Now, we can create mock data:

### ./src/rest-api/training/trainingMockData.js
```javascript
export const trainingsMockData = [
  {
    id: 1,
    name: 'React',
    url: 'http://lemoncode.net/react',
    startDate: new Date('2017-02-22T10:00:00').getTime(),
    endDate: new Date('2017-02-24T12:00:00').getTime(),
    isActive: true,
  },
  {
    id: 2,
    name: 'AngularJS 2.0',
    url: 'http://lemoncode.net/angularjs-2-0-con-typescript',
    startDate: new Date('2016-11-22T19:00:00').getTime(),
    endDate: new Date('2016-11-24T21:00:00').getTime(),
    isActive: true,
  },
  {
    id: 3,
    name: 'Introducción a Git',
    url: 'http://lemoncode.net/introduccion-a-git',
    startDate: new Date('2016-10-25T19:00:00').getTime(),
    endDate: new Date('2016-10-27T21:00:00').getTime(),
    isActive: true,
  },
  {
    id: 4,
    name: 'ALM con Visual Studio',
    url: 'http://lemoncode.net/application-lifecycle-management-con-visual-studio',
    startDate: new Date('2016-10-27T19:00:00').getTime(),
    endDate: new Date('2016-10-29T21:00:00').getTime(),
    isActive: true,
  },
  {
    id: 5,
    name: 'React-Redux',
    url: 'http://lemoncode.net/react-redux',
    startDate: new Date('2017-03-19T19:00:00').getTime(),
    endDate: new Date('2017-03-21T21:00:00').getTime(),
    isActive: false,
  },
  {
    id: 6,
    name: 'D3JS',
    url: 'http://lemoncode.net/d3js',
    startDate: new Date('2017-04-15T19:00:00').getTime(),
    endDate: new Date('2017-04-17T21:00:00').getTime(),
    isActive: false,
  },
  {
    id: 7,
    name: 'DVCS & Metodología',
    url: 'http://lemoncode.net/dvcs-y-metodologia',
    startDate: new Date('2017-05-22T19:00:00').getTime(),
    endDate: new Date('2017-05-24T21:00:00').getTime(),
    isActive: false,
  },
  {
    id: 8,
    name: 'Unit Testing & TDD',
    url: 'http://lemoncode.net/unit-testing-y-tdd',
    startDate: new Date('2017-06-22T19:00:00').getTime(),
    endDate: new Date('2017-06-24T21:00:00').getTime(),
    isActive: false,
  },
];

```

- And fake trainingAPI to fetch trainings:

### ./src/rest-api/training/trainingAPI.js
```javascript
import {trainingsMockData} from './trainingMockData';

// Fake API using es6 Promises polyfill (with babel-preset-env).
// In future, we can replace by real one.
class TrainingAPI {
  fetchTrainings() {
    return Promise.resolve(trainingsMockData);
  }
}

export const trainingAPI = new TrainingAPI();

```

- Once we have trainingAPI, we can use it in TrainingListPageContainer:

### ./src/pages/training/list/pageContainer.jsx
```javascript
import * as React from 'react';
import * as toastr from 'toastr';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';
import {TrainingListPage} from './page';

export class TrainingListPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      trainings: [],
    };

    this.fetchTrainings();
  }

  // We are creating new array from trainings from API
  // Spread operator is available for arrays too.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
  // Other way to do same:
  // var newTrainings = [].concat(trainings);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
  fetchTrainings() {
    trainingAPI.fetchTrainings()
      .then((trainings) => {
        this.setState({
          trainings: [...trainings],
        });
      })
      .catch(() => {
        toastr.error('Something was wrong when fetching trainings :(');
      });
  }

  render() {
    return (
      <TrainingListPage trainings={this.state.trainings} />
    );
  }
}

```

- Now, it's time to create the table:

### ./src/pages/training/list/components/trainingHead.jsx
```javascript
import * as React from 'react';

export const TrainingHeadComponent = () => {
  return (
    <thead>
      <tr>
        <th>
          Active
        </th>
        <th>
          Name
        </th>
        <th>
          Link to course
        </th>
        <th>
        </th>
      </tr>
    </thead>
  );
}

```

### ./src/pages/training/list/components/trainingRow.jsx
```javascript
import * as React from 'react';

export const TrainingRowComponent = (props) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={props.training.isActive}
          disabled
        />
      </td>
      <td>
        <span>{props.training.name}</span>
      </td>
      <td>
        <a href={props.training.url} target="_blank">{props.training.url}</a>
      </td>
      <td>
        <a className="btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
      </td>
    </tr>
  );
}

TrainingRowComponent.propTypes = {
  training: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.number.isRequired,
    endDate: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
  }).isRequired,
}

```

### ./src/pages/training/list/components/trainingList.jsx
```javascript
import * as React from 'react';
import {TrainingHeadComponent} from './trainingHead';
import {TrainingRowComponent} from './trainingRow';

export const TrainingListComponent = (props) => {
  return (
    <div className="container">
      <table className="table table-striped">
        <TrainingHeadComponent />
        <tbody>
          {
            props.trainings.map((training) => (
              <TrainingRowComponent
                key={training.id}
                training={training}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

TrainingListComponent.propTypes = {
  trainings: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      startDate: React.PropTypes.number.isRequired,
      endDate: React.PropTypes.number.isRequired,
      isActive: React.PropTypes.bool.isRequired,
    })
  ).isRequired,
}

```

- Use all components in TrainingListPage:

### ./src/pages/training/list/page.jsx
```diff
import * as React from 'react';
+ import {TrainingListComponent} from './components/trainingList';

- export const TrainingListPage = () => {
+ export const TrainingListPage = (props) => {
    return (
-     <div>Training list</div>
+     <div>
+       <h2 className="jumbotron">Lemoncode Trainings</h2>
+       <TrainingListComponent trainings={props.trainings} />
+     </div>
    );
  }

+ TrainingListPage.PropTypes = {
+   trainings: React.propTypes.arrayOf(
+     React.PropTypes.shape({
+       id: React.PropTypes.number.isRequired,
+       name: React.PropTypes.string.isRequired,
+       url: React.PropTypes.string.isRequired,
+       startDate: React.PropTypes.number.isRequired,
+       endDate: React.PropTypes.number.isRequired,
+       isActive: React.PropTypes.bool.isRequired,
+     })
+   ).isRequired,
+ }

```

- And of course, update route:

### ./src/routes.jsx
```diff
import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routeConstants} from './common/constants/routeConstants';
import {App} from './app';
import {LoginPageContainer} from './pages/login/pageContainer';
- import {TrainingListPage} from './pages/training/list/page';
+ import {TrainingListPageContainer} from './pages/training/list/pageContainer';

export const AppRoutes = (
  <Route path={routeConstants.default} component={App}>
    <IndexRoute component={LoginPageContainer} />
-    <Route path={routeConstants.training.list} component={TrainingListPage} />
+    <Route path={routeConstants.training.list} component={TrainingListPageContainer} />
  </Route>
);

```
