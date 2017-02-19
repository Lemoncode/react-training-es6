import * as React from 'react';
import {TrainingListComponent} from './components/trainingList';

export class TrainingListPage extends React.Component {
  componentDidMount() {
    this.props.fetchTrainings();
  }

  render() {
    return (
      <div>
        <h2 className="jumbotron">Lemoncode Trainings</h2>
        <TrainingListComponent trainings={this.props.trainings} />
      </div>
    );
  }
}

TrainingListPage.propTypes = {
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
  fetchTrainings: React.PropTypes.func.isRequired,
}
