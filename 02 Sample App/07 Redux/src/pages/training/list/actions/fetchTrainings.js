import * as toastr from 'toastr';
import {trainingAPI} from '../../../../rest-api/training/trainingAPI';
import {trainingActionConstants} from '../../../../common/constants/actionConstants/trainingActionConstants';

export const fetchTrainingsStartAction = () => {
  return (dispatcher) => {
    const promise = trainingAPI.fetchTrainings();

    promise.then((trainings) => {
      dispatcher(fetchTrainingsCompleteAction(trainings));
    })
    .catch(() => {
      toastr.error('Something was wrong when fetching trainings :(');
    });

    return promise;
  };
};

const fetchTrainingsCompleteAction = (trainings) => ({
  type: trainingActionConstants.FETCH_TRAINING_LIST,
  payload: trainings,
});
