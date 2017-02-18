import * as React from 'react';
import {Training} from '../../../models/training';
import {TrainingFormComponent} from './components/trainingForm.jsx';

export const TrainingEditPage = () => {
  return (
    <TrainingFormComponent
      training={new Training()}
      onChange={() => {}}
      save={() => {}}
    />
  );
}
