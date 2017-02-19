# 06 Validations

We will take as startup point sample _05 EditTraining_.

In this sample we will add validations to edit form.

Summary steps:

- Install [validate.js](https://github.com/ansman/validate.js) for validations.
- Create _ValidationComponent_.
- Create TrainingErrors model.
- Create single field validation.
- Create form validation.

## Steps to build it

- Let's install validate.js, it's a JavaScript library for validations:

 ```
 npm install validate.js --save
 ```

 - Add lib as vendor:

 ### ./webpack.config.js
 ```diff
 entry: {
   ...
   vendor: [
     ...
     'react-infinite-calendar',
     'react-addons-css-transition-group',
     'moment',
     'react-modal',
+    'validate.js',
   ],
 ```

- We can start to create a validation component that it's going to style input components when errors occurs:

### ./src/common/components/form/validation.jsx
```javascript
import * as React from 'react';
import classNames from './validationStyles';

export const ValidationComponent = (props) => {
  let wrapperClass: string = `${props.className}`;

  if(props.error && props.error.length > 0) {
    wrapperClass = `${wrapperClass} has-error`;
  }

  return (
    <div className={wrapperClass}>
      {props.children}
      <div className={`help-block ${classNames.error}`}>
        {props.error}
      </div>
    </div>
  );
}

ValidationComponent.propTypes = {
  error: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element),
  ]),
}

```

### ./src/common/components/form/validationStyles.css
```css
.error:first-letter {
  text-transform: capitalize;
}

```

- And create a model for errors:

### ./src/models/trainingErrors.js
```javascript
export class TrainingErrors {
  name: string;
  url: string;
  endDate: string;
}

```

- Now we can use it, in _TrainingFormComponent_:

### ./src/pages/training/edit/components/trainingForm.jsx
```diff
import * as React from 'react';
import * as moment from 'moment';
import {InputComponent} from '../../../../common/components/form/input';
import {CheckBoxComponent} from '../../../../common/components/form/checkBox';
import {InputButtonComponent} from '../../../../common/components/form/inputButton';
import {DatePickerModalComponent} from '../../../../common/components/datePickerModal';
import {formatConstants} from '../../../../common/constants/formatConstants';
+
import {ValidationComponent} from '../../../../common/components/form/validation';

export const TrainingFormComponent = (props: Props) => {
  return (
    <form className="container">
      <div className="row">
+      <ValidationComponent
+         className="col-md-6"
+         error={props.trainingErrors.name}
+       >
          <InputComponent
-           className="col-md-6"
            type="text"
            label="Name"
            name="name"
            onChange={props.onChange}
            value={props.training.name}
            placeholder="Name"
          />
+       </ValidationComponent>

+       <ValidationComponent
+         className="col-md-6"
+         error={props.trainingErrors.url}
+       >
          <InputComponent
-           className="col-md-6"
            type="text"
            label="Url"
            name="url"
            onChange={props.onChange}
            value={props.training.url}
            placeholder="Url"
          />
+       </ValidationComponent>
      </div>

      <div className="row">
        <InputButtonComponent
          className="col-md-6"
          type="text"
          label="Start date"
          name="startDate"
          placeholder="Start date"
          value={moment(props.training.startDate).format(formatConstants.shortDate)}
          onChange={props.onChange}
          disabled
          buttonClassName="btn btn-default"
          onClick={props.toggleOpenStartDateModal}
          icon="glyphicon glyphicon-calendar"
        />

        <DatePickerModalComponent
          isOpen={props.isOpenStartDateModal}
          onClose={props.toggleOpenStartDateModal}
          selectedDate={props.training.startDate}
          onChange={props.onChangeStartDate}
        />

+       <ValidationComponent
+         className="col-md-6"
+         error={props.trainingErrors.endDate}
+       >
          <InputButtonComponent
-           className="col-md-6"
            type="text"
            label="End date"
            name="endDate"
            placeholder="End date"
            value={moment(props.training.endDate).format(formatConstants.shortDate)}
            onChange={props.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={props.toggleOpenEndDateModal}
            icon="glyphicon glyphicon-calendar"
          />
+       </ValidationComponent>

        <DatePickerModalComponent
          isOpen={props.isOpenEndDateModal}
          onClose={props.toggleOpenEndDateModal}
          selectedDate={props.training.endDate}
          onChange={props.onChangeEndDate}
        />
      </div>

      <div className="row">
        <CheckBoxComponent
          className="col-md-6"
          label="Active"
          name="isActive"
          onChange={props.onChange}
          value={props.training.isActive}
        />
      </div>

      <div className="row">
        <div className="form-group pull-right">
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-lg btn-success"
              onClick={props.save}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
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
+ trainingErrors: React.PropTypes.shape({
+   name: React.PropTypes.string,
+   url: React.PropTypes.string,
+   endDate: React.PropTypes.string,
+ }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  isOpenStartDateModal: React.PropTypes.bool.isRequired,
  toggleOpenStartDateModal: React.PropTypes.func.isRequired,
  onChangeStartDate: React.PropTypes.func.isRequired,
  isOpenEndDateModal: React.PropTypes.bool.isRequired,
  toggleOpenEndDateModal: React.PropTypes.func.isRequired,
  onChangeEndDate: React.PropTypes.func.isRequired,
}

```

- Updating _TrainingFormComponentContainer_:

### ./src/pages/training/edit/components.trainingFormContainer.jsx
```diff
...

  render() {
    return (
      <TrainingFormComponent
        training={this.props.training}
+       trainingErrors={this.props.trainingErrors}
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
+ trainingErrors: React.PropTypes.shape({
+   name: React.PropTypes.string,
+   url: React.PropTypes.string,
+   endDate: React.PropTypes.string,
+ }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}

```

- Updating _TrainingEditPage_:

### ./src/pages/training/edit/page.jsx
```diff
import * as React from 'react';
import {TrainingFormComponentContainer} from './components/trainingFormContainer';


export const TrainingEditPage = (props) => {
  return (
    <div>
      <h2 className="jumbotron">Edit Training</h2>
      <TrainingFormComponentContainer
        training={props.training}
+       trainingErrors={props.trainingErrors}
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
+ trainingErrors: React.PropTypes.shape({
+   name: React.PropTypes.string,
+   url: React.PropTypes.string,
+   endDate: React.PropTypes.string,
+ }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}

```

- And _TrainingEditPageContainer_:

### ./src/pages/training/edit/pageContainer.jsx
```diff
import * as React from 'react';
import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
import {Training} from '../../../models/training';
+ import {TrainingErrors} from '../../../models/trainingErrors';
import {TrainingEditPage} from './page';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';

export class TrainingEditPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      training: new Training(),
+     trainingErrors: new TrainingErrors(),
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  ...

  render() {
    return (
      <TrainingEditPage
        training={this.state.training}
+       trainingErrors={this.state.trainingErrors}
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

- Now it's time to create validations to feed these error:

### ./src/pages/training/edit/components/validations/trainingFormConstraints.js
```javascript
import moment from 'moment';
import {formatConstants} from '../../../../../common/constants/formatConstants';

export const trainingFormConstraints = {
  name: {
    presence: true,
  },
  url: {
    presence: true,
    url: true,
  },
  endDate: (value, training) => {
    const startDateFormatted = moment(training.startDate)
      .format(formatConstants.shortDate);

    return {
      numericality: {
        greaterThan: training.startDate,
        message: `must be greater than ${startDateFormatted}`,
      },
    };
  },
};

```

### ./src/pages/training/edit/components/validations/trainingFormValidations.js
```javascript
import validate from 'validate.js';
import {TrainingErrors} from '../../../../../models/trainingErrors';
import {trainingFormConstraints} from './trainingFormConstraints';

class TrainingFormValidations {
  validateField(training, fieldName, value) {
    const updatedTraining = {
      ...training,
      [fieldName]: value,
    };

    const errors = validate(updatedTraining, trainingFormConstraints);

    return this.getSingleError(fieldName, errors);
  }

  getSingleError(fieldName, errors) {
    return (errors && errors[fieldName] && errors[fieldName].length > 0) ?
      errors[fieldName][0] :
      '';
  }

  validateForm(training) {
    const errors = validate(training, trainingFormConstraints);

    return this.getTrainingErrors(errors);
  }

  getTrainingErrors(errors) {
    const trainingErrors = new TrainingErrors();

    if(errors) {
      trainingErrors.name = this.getSingleError('name', errors);
      trainingErrors.url = this.getSingleError('url', errors);
      trainingErrors.endDate = this.getSingleError('endDate', errors);
    }

    return trainingErrors;
  }

  isValidForm(trainingErrors) {
    return Object.keys(trainingErrors).every((error) => {
      return !error && error.length <= 0;
    });
  }
}

export const trainingFormValidations = new TrainingFormValidations();

```

- Then we can use it in _TrainingEditPageContainer_:

```diff
import * as React from 'react';
import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
import {Training} from '../../../models/training';
import {TrainingErrors} from '../../../models/trainingErrors';
import {TrainingEditPage} from './page';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';
+ import {trainingFormValidations} from './components/validations/trainingFormValidations';

export class TrainingEditPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      training: new Training(),
      trainingErrors: new TrainingErrors(),
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
+   const error = trainingFormValidations
+     .validateField(this.state.training, fieldName, value);

    this.setState({
      training: {
        ...this.state.training,
        [fieldName]: value
      },
+     trainingErrors: {
+       ...this.state.trainingErrors,
+       [fieldName]: error,
+     },
    });
  }

  save(training) {
+   const trainingErrors = trainingFormValidations.validateForm(training);
+   this.setState({
+     trainingErrors: {
+       ...trainingErrors,
+     },
+   });

+   if(trainingFormValidations.isValidForm(trainingErrors)) {
      toastr.remove();
      trainingAPI.save(training)
        .then((message) => {
          toastr.success(message);
          hashHistory.goBack();
        })
        .catch((error) => {
          toastr.error(error);
        });
+   }
  }

  render() {
    return (
      <TrainingEditPage
        training={this.state.training}
        trainingErrors={this.state.trainingErrors}
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
