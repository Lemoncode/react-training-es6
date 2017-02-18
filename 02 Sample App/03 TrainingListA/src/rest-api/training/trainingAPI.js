import {trainingsMockData} from './trainingMockData';

// Fake API using es6 Promises polyfill (with babel-preset-env).
// In future, we can replace by real one.
class TrainingAPI {
  fetchTrainings() {
    return Promise.resolve(trainingsMockData);
  }
}

export const trainingAPI = new TrainingAPI();
