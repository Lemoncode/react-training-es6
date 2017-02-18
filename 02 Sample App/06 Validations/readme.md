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

- Let's install validate.js, it's a JavaScript library for validations. We'll use require for import this lib:

 ```
 npm install validate.js --save
 ```

 - Add lib as vendor:

 ### ./webpack.config.js
 ```javascript
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

### ./src/common/components/form/validation.tsx
```javascript
import * as React from 'react';
const classNames: any = require('./validationStyles');

interface Props {
  error: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const ValidationComponent = (props: Props) => {
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

```

### ./src/common/components/form/validationStyles.css
```css
.error:first-letter {
  text-transform: capitalize;
}

```

- And create a model for errors:

### ./src/models/trainingErrors.ts
```javascript
export class TrainingErrors {
  name: string;
  url: string;
  endDate: string;
}

```

- Now we can use it, in _TrainingFormComponent_:

### ./src/pages/training/edit/components/trainingForm.tsx
```javascript
import * as React from 'react';
import * as moment from 'moment';
import {Training} from '../../../../models/training';
+ import {TrainingErrors} from '../../../../models/trainingErrors';
import {InputComponent} from '../../../../common/components/form/input';
import {CheckBoxComponent} from '../../../../common/components/form/checkBox';
import {InputButtonComponent} from '../../../../common/components/form/inputButton';
import {DatePickerModalComponent} from '../../../../common/components/datePickerModal';
import {formatConstants} from '../../../../common/constants/formatConstants';

interface Props {
  training: Training;
+ trainingErrors: TrainingErrors;
  onChange: (event) => void;
  save: (event) => void;
  isOpenStartDateModal: boolean;
  toggleOpenStartDateModal: () => void;
  onChangeStartDate: (date: moment.Moment) => void;
  isOpenEndDateModal: boolean;
  toggleOpenEndDateModal: () => void;
  onChangeEndDate: (date: moment.Moment) => void;
}

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

```

- Updating _TrainingFormComponentContainer_:

### ./src/pages/training/edit/components.trainingFormContainer.tsx
```javascript
import * as React from 'react';
import * as moment from 'moment';
import {Training} from '../../../../models/training';
+ import {TrainingErrors} from '../../../../models/trainingErrors';
import {TrainingFormComponent} from './trainingForm';

interface Props {
  training: Training;
+ trainingErrors: TrainingErrors;
  onChange: (fieldName: string, value: any) => void;
  save: (training: Training) => void;
}

...

  public render() {
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

```

- Updating _TrainingEditPage_:

### ./src/pages/training/edit/page.tsx
```javascript
import * as React from 'react';
import {Training} from '../../../models/training';
+ import {TrainingErrors} from '../../../models/trainingErrors';
import {TrainingFormComponentContainer} from './components/trainingFormContainer';

interface Props {
  training: Training;
+ trainingErrors: TrainingErrors;
  onChange: (fieldName: string, value: any) => void;
  save: (training: Training) => void;
}

export const TrainingEditPage = (props: Props) => {
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

```

- And _TrainingEditPageContainer_:

### ./src/pages/training/edit/pageContainer.tsx
```javascript
import * as React from 'react';
import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
import {Training} from '../../../models/training';
+ import {TrainingErrors} from '../../../models/trainingErrors';
import {TrainingEditPage} from './page';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';

interface Props {
  params: any
}

interface State {
  training: Training;
+ trainingErrors: TrainingErrors;
}

export class TrainingEditPageContainer extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      training: new Training(),
+     trainingErrors: new TrainingErrors(),
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  public componentDidMount() {
    this.fetchTraining();
  }

  private fetchTraining() {
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

  private onChange(fieldName, value) {
    this.setState({
      training: {
        ...this.state.training,
        [fieldName]: value
      }
    });
  }

  private save(training: Training) {
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

  public render() {
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

```

- Now it's time to create validations to feed these error:

### ./src/pages/training/edit/components/validations/trainingFormConstraints.ts
```javascript
import * as moment from 'moment';
import {Training} from '../../../../../models/training';
import {formatConstants} from '../../../../../common/constants/formatConstants';

export const trainingFormConstraints = {
  name: {
    presence: true,
  },
  url: {
    presence: true,
    url: true,
  },
  endDate: (value: number, training: Training) => {
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

### ./src/pages/training/edit/components/validations/trainingFormValidations.ts
```javascript
const validate: any = require('validate.js');
import {Training} from '../../../../../models/training';
import {TrainingErrors} from '../../../../../models/trainingErrors';
import {trainingFormConstraints} from './trainingFormConstraints';

class TrainingFormValidations {
  public validateField(training: Training, fieldName: string, value): string {
    const updatedTraining = {
      ...training,
      [fieldName]: value,
    };

    const errors = validate(updatedTraining, trainingFormConstraints);

    return this.getSingleError(fieldName, errors);
  }

  private getSingleError(fieldName:string, errors: string[]): string {
    return (errors && errors[fieldName] && errors[fieldName].length > 0) ?
      errors[fieldName][0] :
      '';
  }

  public validateForm(training: Training): TrainingErrors {
    const errors = validate(training, trainingFormConstraints);

    return this.getTrainingErrors(errors);
  }

  private getTrainingErrors(errors): TrainingErrors {
    const trainingErrors = new TrainingErrors();

    if(errors) {
      trainingErrors.name = this.getSingleError('name', errors);
      trainingErrors.url = this.getSingleError('url', errors);
      trainingErrors.endDate = this.getSingleError('endDate', errors);
    }

    return trainingErrors;
  }

  public isValidForm(trainingErrors: TrainingErrors): boolean {
    return Object.keys(trainingErrors).every((error) => {
      return !error && error.length <= 0;
    });
  }
}

export const trainingFormValidations = new TrainingFormValidations();

```

- Then we can use it in _TrainingEditPageContainer_:

```javascript
import * as React from 'react';
import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
import {Training} from '../../../models/training';
import {TrainingErrors} from '../../../models/trainingErrors';
import {TrainingEditPage} from './page';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';
+ import {trainingFormValidations} from './components/validations/trainingFormValidations';

interface Props {
  params: any
}

interface State {
  training: Training;
+ trainingErrors: TrainingErrors;
}

export class TrainingEditPageContainer extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      training: new Training(),
      trainingErrors: new TrainingErrors(),
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  public componentDidMount() {
    this.fetchTraining();
  }

  private fetchTraining() {
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

  private onChange(fieldName, value) {
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

  private save(training: Training) {
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

  public render() {
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

```
