import * as React from 'react';
import {TrainingFormComponentContainer} from './components/trainingFormContainer';

export const TrainingEditPage = (props) => {
  return (
    <div>
      <h2 className="jumbotron">Edit Training</h2>
      <TrainingFormComponentContainer
        training={props.training}
        trainingErrors={props.trainingErrors}
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
  trainingErrors: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string,
    endDate: React.PropTypes.string,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}
