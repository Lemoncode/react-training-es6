# 05 EditTraining

We will take as startup point sample _04 TrainingListB_.

In this sample we will build an edit form.

Summary steps:

- Install [react-infinite-calendar](https://github.com/clauderic/react-infinite-calendar), [moment](https://github.com/moment/moment) and [react-modal](https://github.com/reactjs/react-modal).
- Navigate to edit training form by id.
- Build common forms components.
- Build DatePicker modal component.
- Build TrainingFormComponent.
- Update trainingAPI.
- Build TrainingEditPage.

## Steps to build it

- Install [react-infinite-calendar](https://github.com/clauderic/react-infinite-calendar) and [react-addons-css-transition-group](https://www.npmjs.com/package/react-addons-css-transition-group) dependency:

```
npm install react-infinite-calendar react-addons-css-transition-group --save
```

- Install [moment](https://github.com/moment/moment) to work with Dates:

```
npm install moment --save
```

- Install [react-modal](https://github.com/reactjs/react-modal) to open calendar as modal window:

```
npm install react-modal --save
```

- Add libraries as vendor and vendorStyles:

### ./webpack.config.js
```diff
entry: {
  ...
  vendor: [
    ...
    'toastr',
    'react-addons-shallow-compare',
    'react-virtualized',
+   'react-infinite-calendar',
+   'react-addons-css-transition-group',
+   'moment',
+   'react-modal',
  ],
  vendorStyles: [
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    '../node_modules/toastr/build/toastr.css',
    '../node_modules/react-virtualized/styles.css',
+   '../node_modules/react-infinite-calendar/styles.css',
  ],
```

- We can start to create a blank TrainingEditPage, to work with navigation:

### ./src/pages/training/edit/page.jsx

```javascript
import * as React from 'react';

export const TrainingEditPage = () => {
  return (
    <div>Training Edit page</div>
  );
}

```

- Add route constant:

### ./src/common/constants/routeConstants.js
```diff
const trainingRoute = '/training';

export const routeConstants = {
  default: '/',
  training: {
    list: `${trainingRoute}/list`,
+   edit: `${trainingRoute}/edit`,
+   editWithParams: `${trainingRoute}/edit/:id`,
  },
};

```

- And route:

### ./src/routes.jsx
```diff
import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routeConstants} from './common/constants/routeConstants';
import {App} from './app';
import {LoginPageContainer} from './pages/login/pageContainer';
import {TrainingListPageContainer} from './pages/training/list/pageContainer';
+ import {TrainingEditPage} from './pages/training/edit/page';

export const AppRoutes = (
  <Route path={routeConstants.default} component={App}>
    <IndexRoute component={LoginPageContainer} />
    <Route path={routeConstants.training.list} component={TrainingListPageContainer} />
+   <Route path={routeConstants.training.editWithParams} component={TrainingEditPage} />
  </Route>
);

```

- Finally, update _TrainingRowComponent_ to navigate to TrainingEditPage by training Id:

### ./src/pages/training/list/components/trainingRow.jsx
```diff
import * as React from 'react';
+ import {Link} from 'react-router';
import {Training} from '../../../../models/training';
import {TableRowComponent} from '../../../../common/components/tableRow';
import classNames from './trainingRowStyles';
+ import {routeConstants} from '../../../../common/constants/routeConstants';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js

// We can use spread operator for React properties too
// https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes
export const TrainingRowComponent = (props) => {
  return (
    <TableRowComponent
      {...props}
      rowKey={props.key}
      // We have enable camelCase parser in webpack.config.js
      className={`${props.className} ${classNames.rowStriped}`}
    >
      <input type="checkbox" checked={props.rowData.isActive} disabled/>
      <span>{props.rowData.name}</span>
      <a href={props.rowData.url} target="_blank">{props.rowData.url}</a>
-     <a className=" btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
+     <Link
+       to={`${routeConstants.training.edit}/${props.rowData.id}`}
+       className=" btn btn-primary"
+     >
+       <i className="glyphicon glyphicon-pencil" />
+     </Link>
    </TableRowComponent>
  );
}
...
```

- Once we have navigation, we can start with creating _TrainingFormComponent_.
  We're going to start with form components:

### ./src/common/components/form/input.jsx
```diff
import * as React from 'react';

export const InputComponent = (props) => {
  return (
-   <div className="form-group">
+   <div className={`form-group ${props.className}`}>
      <label htmlFor={props.name}>
        {props.label}
      </label>
      <input
        id={props.name}
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
+       disabled={props.disabled}
      />
    </div>
  );
}

InputComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
+ className: React.PropTypes.string,
+ disabled: React.PropTypes.bool,
}

```

### ./src/common/components/form/inputButton.jsx
```javascript
import * as React from 'react';

export const InputButtonComponent = (props) => {
  return (
    <div className={`form-group ${props.className}`}>
      <label htmlFor={props.name}>
        {props.label}
      </label>
      <div className="input-group">
        <input
          id={props.name}
          type={props.type}
          className="form-control"
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        />
        <div className="input-group-btn">
          <span className={props.buttonClassName} onClick={props.onClick}>
            <i className={props.icon} />
          </span>
        </div>
      </div>
    </div>
  );
};

InputButtonComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  buttonClassName: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
}

```

### ./src/common/components/form/checkBox.jsx
```javascript
import * as React from 'react';

export const CheckBoxComponent = (props) => {
  return (
    <div className={`checkbox ${props.className}`}>
      <label htmlFor={props.name}>
        <input
          id={props.name}
          type="checkbox"
          name={props.name}
          checked={props.value}
          onChange={props.onChange}
        />
        {props.label}
      </label>
    </div>
  );
}

CheckBoxComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
}

```

- Building TrainingFormComponent:

### ./src/pages/training/edit/components/trainingForm.jsx
```javascript
import * as React from 'react';
import moment from 'moment';
import {InputComponent} from '../../../../common/components/form/input';
import {CheckBoxComponent} from '../../../../common/components/form/checkBox';
import {InputButtonComponent} from '../../../../common/components/form/inputButton';

export class TrainingFormComponent extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.save = this.save.bind(this);
  }

  onChange (event) {
    const fieldName = event.target.name;
    const value = event.target.type === 'checkbox' ?
      event.target.checked :
      event.target.value;

    this.props.onChange(fieldName, value);
  }

  onChangeStartDate(date) {
    this.onChangeDate('startDate', date);
    this.toggleOpenStartDateModal();
  }

  onChangeEndDate(date) {
    this.onChangeDate('endDate', date);
    this.toggleOpenEndDateModal();
  }

  onChangeDate(fieldName, date) {
    const milliseconds = date.valueOf();
    this.props.onChange(fieldName, milliseconds);
  }

  save(event) {
    event.preventDefault();
    this.props.save(this.props.training);
  }

  render() {
    return (
      <form className="container">
        <div className="row">
          <InputComponent
            className="col-md-6"
            type="text"
            label="Name"
            name="name"
            onChange={this.onChange}
            value={this.props.training.name}
            placeholder="Name"
          />

          <InputComponent
            className="col-md-6"
            type="text"
            label="Url"
            name="url"
            onChange={this.onChange}
            value={this.props.training.url}
            placeholder="Url"
          />
        </div>

        <div className="row">
          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="Start date"
            name="startDate"
            placeholder="Start date"
            value={moment(this.props.training.startDate).format('YYYY-MM-DD')}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={() => {}}
            icon="glyphicon glyphicon-calendar"
          />

          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="End date"
            name="endDate"
            placeholder="End date"
            value={moment(this.props.training.endDate).format('YYYY-MM-DD')}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={() => {}}
            icon="glyphicon glyphicon-calendar"
          />
        </div>

        <div className="row">
          <CheckBoxComponent
            className="col-md-6"
            label="Active"
            name="isActive"
            onChange={this.onChange}
            value={this.props.training.isActive}
          />
        </div>

        <div className="row">
          <div className="form-group pull-right">
            <div className="col-md-1">
              <button type="button" className="btn btn-lg btn-success" onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
};

TrainingFormComponent.propTypes = {
  training: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.number.isRequired,
    endDate: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}

```

- We can use it in _TrainingEditPage_ to see how our form is going on:

### ./src/pages/training/edit/page.jsx
```diff
import * as React from 'react';
+ import {Training} from '../../../models/training';
+ import {TrainingFormComponent} from './components/trainingForm';

export const TrainingEditPage = () => {
  return (
-   <div>Training Edit page</div>
+   <TrainingFormComponent
+     training={new Training()}
+     onChange={() => {}}
+     save={() => {}}
+   />
  );
}

```

- Now it's time to create the _DatePickerModalComponent_:

### ./src/common/components/datePickerModal/datePickerModal.jsx
```javascript
import * as React from 'react';
import Modal from 'react-modal';
import classNames from './datePickerModalStyles';

export const DatePickerModalComponent = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Date Picker Modal"
      onRequestClose={props.onClose}
      className={`${classNames.modal} modal-dialog modal-open`}
      overlayClassName={classNames.overlay}
    >
      <h1>This is a modal</h1>
    </Modal>
  );
};

DatePickerModalComponent.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  selectedDate: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

```

### ./src/common/components/datePickerModal/datePickerModalStyles.css
```css
.modal {
  padding: 10px;
  outline: none;
  height: 95%;
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: rgba(0,0,0,0.5);
}

```

- How it looks like:

### ./src/common/components/datePickerModal/index.js
```javascript
import {DatePickerModalComponent} from './datePickerModal';

export {
  DatePickerModalComponent,
}

```

### ./src/pages/training/edit/components/trainingForm.jsx
```diff
+ import {DatePickerModalComponent} from '../../../../common/components/datePickerModal';
...
    <InputButtonComponent
      className="col-md-6"
      type="text"
      label="Start date"
      name="startDate"
      placeholder="Start date"
      value={moment(this.props.training.startDate).format('YYYY-MM-DD')}
      onChange={this.onChange}
      disabled
      buttonClassName="btn btn-default"
      onClick={() => {}}
      icon="glyphicon glyphicon-calendar"
    />

+   <DatePickerModalComponent
+     isOpen={true}
+     onClose={() => {}}
+     selectedDate={0}
+     onChange={() => {}}
+   />

...

```

### ./src/common/components/datePickerModal/components/datePicker.jsx
```javascript
import * as React from 'react';
import {AutoSizer} from 'react-virtualized';
import InfiniteCalendar from 'react-infinite-calendar';
import classNames from './datePickerStyles';

// https://github.com/clauderic/react-infinite-calendar/issues/60
export const DatePickerComponent = (props) => {
  return (
    <AutoSizer>
    {
      ({width, height}) =>
      <div>
        <button
          type="button"
          className={`close ${classNames.closeButton}`}
          onClick={props.onClose}
        >
          <span>&times;</span>
        </button>
        <InfiniteCalendar
          width={width}
          height={height}
          selectedDate={props.selectedDate}
          afterSelect={props.onChange}
          showHeader={false}
        />
      </div>
    }
    </AutoSizer>
  );
};

DatePickerComponent.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  selectedDate: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

```

### ./src/common/components/datePickerModal/components/datePickerStyles.css
```css
.close-button {
  position: absolute;
  z-index: 2;
  top: 20px;
  right: 25px;
}

```

- Updating _DatePickerModalComponent_:

### ./src/common/components/datePickerModal/datePickerModal.jsx
```diff
import * as React from 'react';
import Modal from 'react-modal';
+ import {DatePickerComponent} from './components/datePicker';
import classNames from './datePickerModalStyles';

export const DatePickerModalComponent = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Date Picker Modal"
      onRequestClose={props.onClose}
      className={`${classNames.modal} modal-dialog modal-open`}
      overlayClassName={classNames.overlay}
    >
-     <h1>This is a modal</h1>
+     <DatePickerComponent
+       onClose={props.onClose}
+       selectedDate={props.selectedDate}
+       onChange={props.onChange}
+     />
    </Modal>
  );
};

DatePickerModalComponent.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  selectedDate: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

```

- Extract date format to a constants:

### ./src/common/constants/formatConstants.js
```javascript
export const formatConstants = {
  shortDate: 'YYYY-MM-DD',
};

```

- Updating _TrainingFormComponent_:

### ./src/pages/training/edit/components/trainingForm.jsx
```diff
import * as React from 'react';
import moment from 'moment';
import {InputComponent} from '../../../../common/components/form/input';
import {CheckBoxComponent} from '../../../../common/components/form/checkBox';
import {InputButtonComponent} from '../../../../common/components/form/inputButton';
import {DatePickerModalComponent} from '../../../../common/components/datePickerModal';
+ import {formatConstants} from '../../../../common/constants/formatConstants';

export class TrainingFormComponent extends React.Component {
  constructor() {
    super();

+   this.state = {
+     isOpenStartDateModal: false,
+     isOpenEndDateModal: false,
+   };

    this.onChange = this.onChange.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
+   this.toggleOpenStartDateModal = this.toggleOpenStartDateModal.bind(this);
+   this.toggleOpenEndDateModal = this.toggleOpenEndDateModal.bind(this);
    this.save = this.save.bind(this);
  }

  onChange (event) {
    const fieldName = event.target.name;
    const value = event.target.type === 'checkbox' ?
      event.target.checked :
      event.target.value;

    this.props.onChange(fieldName, value);
  }

  onChangeStartDate(date) {
    this.onChangeDate('startDate', date);
    this.toggleOpenStartDateModal();
  }

  onChangeEndDate(date) {
    this.onChangeDate('endDate', date);
    this.toggleOpenEndDateModal();
  }

  onChangeDate(fieldName, date) {
    const milliseconds = date.valueOf();
    this.props.onChange(fieldName, milliseconds);
  }

+ toggleOpenStartDateModal() {
+   this.toggleOpenModal('isOpenStartDateModal');
+ }

+ toggleOpenEndDateModal() {
+   this.toggleOpenModal('isOpenEndDateModal');
+ }

+ toggleOpenModal(fieldName) {
+   this.setState({
+     ...this.state,
+     [fieldName]: !this.state[fieldName]
+   });
+ }

  save(event) {
    event.preventDefault();
    this.props.save(this.props.training);
  }

  render() {
    return (
      <form className="container">
        <div className="row">
          <InputComponent
            className="col-md-6"
            type="text"
            label="Name"
            name="name"
            onChange={this.onChange}
            value={this.props.training.name}
            placeholder="Name"
          />

          <InputComponent
            className="col-md-6"
            type="text"
            label="Url"
            name="url"
            onChange={this.onChange}
            value={this.props.training.url}
            placeholder="Url"
          />
        </div>

        <div className="row">
          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="Start date"
            name="startDate"
            placeholder="Start date"
-           value={moment(this.props.training.startDate).format('YYYY-MM-DD')}
+           value={moment(this.props.training.startDate).format(formatConstants.shortDate)}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
-           onClick={() => {}}
+           onClick={this.toggleOpenStartDateModal}
            icon="glyphicon glyphicon-calendar"
          />

          <DatePickerModalComponent
-           isOpen={true}
+           isOpen={this.state.isOpenStartDateModal}
-           onClose={() => {}}
+           onClose={this.toggleOpenStartDateModal}
-           selectedDate={0}
+           selectedDate={this.props.training.startDate}
-           onChange={() => {}}
+           onChange={this.onChangeStartDate}
          />

          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="End date"
            name="endDate"
            placeholder="End date"
-           value={moment(this.props.training.endDate).format('YYYY-MM-DD')}
+           value={moment(this.props.training.endDate).format(formatConstants.shortDate)}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
-           onClick={() => {}}
+           onClick={this.toggleOpenEndDateModal}
            icon="glyphicon glyphicon-calendar"
          />

+         <DatePickerModalComponent
+           isOpen={this.state.isOpenEndDateModal}
+           onClose={this.toggleOpenEndDateModal}
+           selectedDate={this.props.training.endDate}
+           onChange={this.onChangeEndDate}
+         />
        </div>

        <div className="row">
          <CheckBoxComponent
            className="col-md-6"
            label="Active"
            name="isActive"
            onChange={this.onChange}
            value={this.props.training.isActive}
          />
        </div>

        <div className="row">
          <div className="form-group pull-right">
            <div className="col-md-1">
              <button type="button" className="btn btn-lg btn-success" onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
};

TrainingFormComponent.propTypes = {
  training: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.number.isRequired,
    endDate: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}

```

- Before start using TrainingFormComponent, we are going to update trainingAPI:

### ./src/rest-api/training/trainingAPI.js

```diff
import {trainingsMockData} from './trainingMockData';

// Fake API using es6 Promises polyfill (with babel-preset-env).
// In future, we can replace by real one.
class TrainingAPI {
+ trainings;

+ constructor() {
+   this.trainings = trainingsMockData;
+ }

  fetchTrainings() {
-   return Promise.resolve(trainingsMockData);
+   return Promise.resolve(this.trainings);
  }

+ fetchTrainingById(id) {
+   const training = this.trainings.find(t => t.id === id);
+   return Promise.resolve(training);
+ }

+ save(training) {
+   const index = this.trainings.findIndex(t => t.id === training.id);
+
+   return index >= 0 ?
+     this.saveTrainingByIndex(index, training) :
+     Promise.reject('Something was wrong saving training :(');
+ }

+ // Just ensure no mutable data. Copy in new Array all items but replacing
+ // object to update by training from params.
+ saveTrainingByIndex(index, training) {
+   this.trainings = [
+     ...this.trainings.slice(0, index),
+     training,
+     ...this.trainings.slice(index + 1)
+   ];
+
+   return Promise.resolve('Save training success');
+ }
}

export const trainingAPI = new TrainingAPI();

```

- Create _TrainingEditPageContainer_:

### ./src/pages/training/edit/pageContainer.jsx
```javascript
import * as React from 'react';
import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
import {Training} from '../../../models/training';
import {TrainingEditPage} from './page';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';

export class TrainingEditPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      training: new Training(),
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.fetchTraining();
  }

  fetchTraining() {
    const trainingId = Number(this.props.params.id) || 0;
    trainingAPI.fetchTrainingById(trainingId)
      .then((training) => {
        this.setState({
          training: {...training}
        })
      })
      .catch((error) => {
        toastr.remove();
        toastr.error(error);
      });
  }

  onChange(fieldName, value) {
    this.setState({
      training: {
        ...this.state.training,
        [fieldName]: value
      }
    });
  }

  save(training) {
    toastr.remove();
    trainingAPI.save(training)
      .then((message) => {
        toastr.success(message);
        hashHistory.goBack();
      })
      .catch((error) => {
        toastr.error(error);
      });
  }

  render() {
    return (
      <TrainingEditPage
        training={this.state.training}
        onChange={this.onChange}
        save={this.save}
      />
    );
  }
}

TrainingEditPageContainer.propTypes = {
  params: React.PropTypes.any.isRequired,
}

```

- Update route:

### ./src/routes.jsx
```diff
import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routeConstants} from './common/constants/routeConstants';
import {App} from './app';
import {LoginPageContainer} from './pages/login/pageContainer';
import {TrainingListPageContainer} from './pages/training/list/pageContainer';
- import {TrainingEditPage} from './pages/training/edit/page';
+ import {TrainingEditPageContainer} from './pages/training/edit/pageContainer';

export const AppRoutes = (
  <Route path={routeConstants.default} component={App}>
    <IndexRoute component={LoginPageContainer} />
    <Route path={routeConstants.training.list} component={TrainingListPageContainer} />
-   <Route path={routeConstants.training.editWithParams} component={TrainingEditPage} />
+   <Route path={routeConstants.training.editWithParams} component={TrainingEditPageContainer} />
  </Route>
);

```

- Update _TrainingEditPage_:

### ./src/pages/training/edit/page.jsx

```diff
import * as React from 'react';
import {TrainingFormComponent} from './components/trainingForm';

- export const TrainingEditPage = () => {
+ export const TrainingEditPage = (props) => {
    return (
-     <TrainingFormComponent
-       training={new Training()}
-      onChange={() => {}}
-       save={() => {}}
-     />
+     <div>
+       <h2 className="jumbotron">Edit Training</h2>
+       <TrainingFormComponent
+         training={props.training}
+         onChange={props.onChange}
+         save={props.save}
+       />
+     </div>
    );
  }

+ TrainingEditPage.propTypes = {
+   training: React.PropTypes.shape({
+     id: React.PropTypes.number.isRequired,
+     name: React.PropTypes.string.isRequired,
+     url: React.PropTypes.string.isRequired,
+     startDate: React.PropTypes.number.isRequired,
+     endDate: React.PropTypes.number.isRequired,
+     isActive: React.PropTypes.bool.isRequired,
+   }).isRequired,
+   onChange: React.PropTypes.func.isRequired,
+   save: React.PropTypes.func.isRequired,
+ }

```

- Too much lines on _TrainingFormComponent_? Ok, let's go to create container:

### ./src/pages/training/edit/components/trainingForm.jsx
```diff
import * as React from 'react';
import moment from 'moment';
import {InputComponent} from '../../../../common/components/form/input';
import {CheckBoxComponent} from '../../../../common/components/form/checkBox';
import {InputButtonComponent} from '../../../../common/components/form/inputButton';
import {DatePickerModalComponent} from '../../../../common/components/datePickerModal';
import {formatConstants} from '../../../../common/constants/formatConstants';

- export class TrainingFormComponent extends React.Component {
+ export const TrainingFormComponent = (props) => {
-   constructor() {
-     super();

-     this.state = {
-       isOpenStartDateModal: false,
-       isOpenEndDateModal: false,
-     };

-     this.onChange = this.onChange.bind(this);
-     this.onChangeStartDate = this.onChangeStartDate.bind(this);
-     this.onChangeEndDate = this.onChangeEndDate.bind(this);
-     this.toggleOpenStartDateModal = this.toggleOpenStartDateModal.bind(this);
-     this.toggleOpenEndDateModal = this.toggleOpenEndDateModal.bind(this);
-     this.save = this.save.bind(this);
-   }

-   onChange (event) {
-     const fieldName = event.target.name;
-     const value = event.target.type === 'checkbox' ?
-       event.target.checked :
-       event.target.value;

-     this.props.onChange(fieldName, value);
-   }

-   onChangeStartDate(date: moment.Moment) {
-     this.onChangeDate('startDate', date);
-     this.toggleOpenStartDateModal();
-   }

-   onChangeEndDate(date: moment.Moment) {
-     this.onChangeDate('endDate', date);
-     this.toggleOpenEndDateModal();
-   }

-   onChangeDate(fieldName: string, date: moment.Moment) {
-     const milliseconds = date.valueOf();
-     this.props.onChange(fieldName, milliseconds);
-   }

-   toggleOpenStartDateModal() {
-     this.toggleOpenModal('isOpenStartDateModal');
-   }

-   toggleOpenEndDateModal() {
-     this.toggleOpenModal('isOpenEndDateModal');
-   }

-   toggleOpenModal(fieldName) {
-     this.setState({
-       ...this.state,
-       [fieldName]: !this.state[fieldName]
-     });
-   }

-   save(event) {
-     event.preventDefault();
-     this.props.save(this.props.training);
-   }

-   render() {
      return (
        <form className="container">
          <div className="row">
            <InputComponent
              className="col-md-6"
              type="text"
              label="Name"
              name="name"
-             onChange={this.onChange}
+             onChange={props.onChange}
-             value={this.props.training.name}
+             value={props.training.name}
              placeholder="Name"
            />

            <InputComponent
              className="col-md-6"
              type="text"
              label="Url"
              name="url"
-             onChange={this.onChange}
+             onChange={props.onChange}
-             value={this.props.training.url}
+             value={props.training.url}
              placeholder="Url"
            />
          </div>

          <div className="row">
            <InputButtonComponent
              className="col-md-6"
              type="text"
              label="Start date"
              name="startDate"
              placeholder="Start date"
-             value={moment(this.props.training.startDate).format(formatConstants.shortDate)}
+             value={moment(props.training.startDate).format(formatConstants.shortDate)}
-             onChange={this.onChange}
+             onChange={props.onChange}
              disabled
              buttonClassName="btn btn-default"
-             onClick={this.toggleOpenStartDateModal}
+             onClick={props.toggleOpenStartDateModal}
              icon="glyphicon glyphicon-calendar"
            />

            <DatePickerModalComponent
-             isOpen={this.state.isOpenStartDateModal}
+             isOpen={props.isOpenStartDateModal}
-             onClose={this.toggleOpenStartDateModal}
+             onClose={props.toggleOpenStartDateModal}
-             selectedDate={this.props.training.startDate}
+             selectedDate={props.training.startDate}
-             onChange={this.onChangeStartDate}
+             onChange={props.onChangeStartDate}
            />

            <InputButtonComponent
              className="col-md-6"
              type="text"
              label="End date"
              name="endDate"
              placeholder="End date"
-             value={moment(this.props.training.endDate).format(formatConstants.shortDate)}
+             value={moment(props.training.endDate).format(formatConstants.shortDate)}
-             onChange={this.onChange}
+             onChange={props.onChange}
              disabled
              buttonClassName="btn btn-default"
-             onClick={this.toggleOpenEndDateModal}
+             onClick={props.toggleOpenEndDateModal}
              icon="glyphicon glyphicon-calendar"
            />

            <DatePickerModalComponent
-             isOpen={this.state.isOpenEndDateModal}
+             isOpen={props.isOpenEndDateModal}
-             onClose={this.toggleOpenEndDateModal}
+             onClose={props.toggleOpenEndDateModal}
-             selectedDate={this.props.training.endDate}
+             selectedDate={props.training.endDate}
-             onChange={this.onChangeEndDate}
+             onChange={props.onChangeEndDate}
            />
          </div>

          <div className="row">
            <CheckBoxComponent
              className="col-md-6"
              label="Active"
              name="isActive"
-             onChange={this.onChange}
+             onChange={props.onChange}
-             value={this.props.training.isActive}
+             value={props.training.isActive}
            />
          </div>

          <div className="row">
            <div className="form-group pull-right">
              <div className="col-md-1">
-               <button type="button" className="btn btn-lg btn-success" onClick={this.save}>
+               <button
+                 type="button"
+                 className="btn btn-lg btn-success"
+                 onClick={props.save}
+               >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      );
    }
  };

  TrainingFormComponent.propTypes = {
    training: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      startDate: React.PropTypes.number.isRequired,
      endDate: React.PropTypes.number.isRequired,
      isActive: React.PropTypes.bool.isRequired,
    }).isRequired,
    onChange: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired,
+   isOpenStartDateModal: React.PropTypes.bool.isRequired,
+   toggleOpenStartDateModal: React.PropTypes.func.isRequired,
+   onChangeStartDate: React.PropTypes.func.isRequired,
+   isOpenEndDateModal: React.PropTypes.bool.isRequired,
+   toggleOpenEndDateModal: React.PropTypes.func.isRequired,
+   onChangeEndDate: React.PropTypes.func.isRequired,
  }

```

- Create _TrainingFormComponentContainer_:

### ./src/pages/training/edit/components/trainingFormContainer.jsx
```javascript
import * as React from 'react';
import {TrainingFormComponent} from './trainingForm';

export class TrainingFormComponentContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpenStartDateModal: false,
      isOpenEndDateModal: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.toggleOpenStartDateModal = this.toggleOpenStartDateModal.bind(this);
    this.toggleOpenEndDateModal = this.toggleOpenEndDateModal.bind(this);
    this.save = this.save.bind(this);
  }

  onChange (event) {
    const fieldName = event.target.name;
    const value = event.target.type === 'checkbox' ?
      event.target.checked :
      event.target.value;

    this.props.onChange(fieldName, value);
  }

  onChangeStartDate(date) {
    this.onChangeDate('startDate', date);
    this.toggleOpenStartDateModal();
  }

  onChangeEndDate(date) {
    this.onChangeDate('endDate', date);
    this.toggleOpenEndDateModal();
  }

  onChangeDate(fieldName, date) {
    const milliseconds = date.valueOf();
    this.props.onChange(fieldName, milliseconds);
  }

  toggleOpenStartDateModal() {
    this.toggleOpenModal('isOpenStartDateModal');
  }

  toggleOpenEndDateModal() {
    this.toggleOpenModal('isOpenEndDateModal');
  }

  toggleOpenModal(fieldName) {
    this.setState({
      ...this.state,
      [fieldName]: !this.state[fieldName]
    });
  }

  save(event) {
    event.preventDefault();
    this.props.save(this.props.training);
  }

  render() {
    return (
      <TrainingFormComponent
        training={this.props.training}
        onChange={this.onChange}
        save={this.save}
        isOpenStartDateModal={this.state.isOpenStartDateModal}
        toggleOpenStartDateModal={this.toggleOpenStartDateModal}
        onChangeStartDate={this.onChangeStartDate}
        isOpenEndDateModal={this.state.isOpenEndDateModal}
        toggleOpenEndDateModal={this.toggleOpenEndDateModal}
        onChangeEndDate={this.onChangeEndDate}
      />
    );
  }
};

TrainingFormComponentContainer.propTypes = {
  training: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.number.isRequired,
    endDate: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}

```

- Update _TrainingEditPage_:

### ./src/pages/training/edit/page.jsx
```diff
import * as React from 'react';
- import {Training} from '../../../models/training';
- import {TrainingFormComponent} from './components/trainingForm';
+ import {TrainingFormComponentContainer} from './components/trainingFormContainer';


export const TrainingEditPage = (props) => {
  return (
    <div>
      <h2 className="jumbotron">Edit Training</h2>
-     <TrainingFormComponent
+     <TrainingFormComponentContainer
        training={props.training}
        onChange={props.onChange}
        save={props.save}
      />
    </div>
  );
}

TrainingEditPage.propTypes = {
  training: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.number.isRequired,
    endDate: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}

```
