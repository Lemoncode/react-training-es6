import * as React from 'react';
import {TrainingFormComponentContainer} from './components/trainingFormContainer';

export class TrainingEditPage extends React.Component {
  componentDidMount() {
    this.props.fetchTrainingById(this.props.trainingId);
  }

  render() {
    return (
      <div>
        <h2 className="jumbotron">Edit Training</h2>
        <TrainingFormComponentContainer
          training={this.props.training}
          trainingErrors={this.props.trainingErrors}
          onChange={this.props.onChange}
          save={this.props.save}
        />
      </div>
    );
  }
}

TrainingEditPage.propTypes = {
  trainingId: React.PropTypes.number.isRequired,
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
  fetchTrainingById: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}
