import {Training} from '../../models/training';
import {TrainingErrors} from '../../models/trainingErrors';
import {trainingActionConstants} from '../../common/constants/actionConstants/trainingActionConstants';

class TrainingEditState {
  training;
  trainingErrors;

  constructor() {
    this.training = new Training();
    this.trainingErrors = new TrainingErrors();
  }
}

export const trainingEditReducer = (state = new TrainingEditState(), action) => {
  switch (action.type) {
    case trainingActionConstants.FETCH_TRAINING_ENTITY:
      return handleFetchTrainingEntity(state, action.payload);
    case trainingActionConstants.TRAINING_CONTENT_CHANGED:
      return handleTrainingContentChanged(state, action.payload);
    case trainingActionConstants.SAVE_TRAINING:
      return handleSaveTraining(state, action.payload);
    default:
      return state;
  };
};

const handleFetchTrainingEntity = (state, payload) => ({
  ...state,
  training: {
    ...payload,
  },
});

const handleTrainingContentChanged = (state, payload) => ({
  ...state,
  training: {
    ...state.training,
    [payload.fieldName]: payload.value,
  },
  trainingErrors: {
    ...state.trainingErrors,
    [payload.fieldName]: payload.error
  }
});

const handleSaveTraining = (state, payload) => ({
  ...state,
  trainingErrors: {
    ...payload,
  },
});
