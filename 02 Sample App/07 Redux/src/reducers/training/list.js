import {trainingActionConstants} from '../../common/constants/actionConstants/trainingActionConstants';

export const trainingListReducer = (state = [], action) => {
  switch (action.type) {
    case trainingActionConstants.FETCH_TRAINING_LIST:
      return [...action.payload];
    default:
      return state;
  }
};
