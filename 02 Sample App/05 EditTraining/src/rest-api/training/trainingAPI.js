import {trainingsMockData} from './trainingMockData';

// Fake API using es6 Promises polyfill (with babel-preset-env).
// In future, we can replace by real one.
class TrainingAPI {
  trainings;

  constructor() {
    this.trainings = trainingsMockData;
  }

  fetchTrainings() {
    return Promise.resolve(this.trainings);
  }

  fetchTrainingById(id) {
    const training = this.trainings.find(t => t.id === id);
    return Promise.resolve(training);
  }

  save(training) {
    const index = this.trainings.findIndex(t => t.id === training.id);

    return index >= 0 ?
      this.saveTrainingByIndex(index, training) :
      Promise.reject('Something was wrong saving training :(');
  }

  // Just ensure no mutable data. Copy in new Array all items but replacing
  // object to update by training from params.
  saveTrainingByIndex(index, training) {
    this.trainings = [
      ...this.trainings.slice(0, index),
      training,
      ...this.trainings.slice(index 1)
    ];
    
    return Promise.resolve('Save training success');
  }
}

export const trainingAPI = new TrainingAPI();
