import {trainingFormValidations} from '../components/validations/trainingFormValidations';
import {trainingActionConstants} from '../../../../common/constants/actionConstants/trainingActionConstants';

export const trainingContentChangedAction = (training, fieldName, value) => {
  const error = trainingFormValidations.validateField(training, fieldName, value);

  return {
    type: trainingActionConstants.TRAINING_CONTENT_CHANGED,
    payload: {
      fieldName,
      value,
      error,
    },
  }
};
