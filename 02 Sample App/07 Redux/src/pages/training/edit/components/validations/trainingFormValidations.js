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
