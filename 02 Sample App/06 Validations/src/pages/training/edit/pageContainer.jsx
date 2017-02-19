import * as React from 'react';
import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
import {Training} from '../../../models/training';
import {TrainingErrors} from '../../../models/trainingErrors';
import {TrainingEditPage} from './page';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';
import {trainingFormValidations} from './components/validations/trainingFormValidations';

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
    const error = trainingFormValidations
      .validateField(this.state.training, fieldName, value);
    this.setState({
      training: {
        ...this.state.training,
        [fieldName]: value
      },
      trainingErrors: {
        ...this.state.trainingErrors,
        [fieldName]: error,
      },
    });
  }

  save(training) {
    const trainingErrors = trainingFormValidations.validateForm(training);
    this.setState({
      trainingErrors: {
        ...trainingErrors,
      },
    });

    if(trainingFormValidations.isValidForm(trainingErrors)) {
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
