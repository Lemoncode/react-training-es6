import * as React from 'react';
import {TrainingHeadComponent} from './trainingHead';
import {TrainingRowComponent} from './trainingRow';

export const TrainingListComponent = (props) => {
  return (
    <div className="container">
      <table className="table table-striped">
        <TrainingHeadComponent />
        <tbody>
          {
            props.trainings.map((training) => (
              <TrainingRowComponent
                key={training.id}
                training={training}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

TrainingListComponent.propTypes = {
  trainings: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      startDate: React.PropTypes.number.isRequired,
      endDate: React.PropTypes.number.isRequired,
      isActive: React.PropTypes.bool.isRequired,
    })
  ).isRequired,
}
