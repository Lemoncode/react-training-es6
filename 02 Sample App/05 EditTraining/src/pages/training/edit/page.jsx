import * as React from 'react';
import {Training} from '../../../models/training';
import {TrainingFormComponent} from './components/trainingForm';

export const TrainingEditPage = (props) => {
  return (
    <div>
      <h2 className="jumbotron">Edit Training</h2>
      <TrainingFormComponent
        training={props.training}
        onChange={props.onChange}
        save={props.save}
      />
    </div>
  );
}

TrainingEditPage.propTypes = {
  training: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.number.isRequired,
    endDate: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}
