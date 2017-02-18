import * as React from 'react';
import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
import {Training} from '../../../models/training';
import {TrainingEditPage} from './page';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';

export class TrainingEditPageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      training: new Training(),
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.fetchTraining();
  }

  fetchTraining() {
    const trainingId = Number(this.props.params.id) || 0;
    trainingAPI.fetchTrainingById(trainingId)
      .then((training) => {
        this.setState({
          training: {...training}
        })
      })
      .catch((error) => {
        toastr.remove();
        toastr.error(error);
      });
  }

  onChange(fieldName, value) {
    this.setState({
      training: {
        ...this.state.training,
        [fieldName]: value
      }
    });
  }

  save(training) {
    toastr.remove();
    trainingAPI.save(training)
      .then((message) => {
        toastr.success(message);
        hashHistory.goBack();
      })
      .catch((error) => {
        toastr.error(error);
      });
  }

  render() {
    return (
      <TrainingEditPage
        training={this.state.training}
        onChange={this.onChange}
        save={this.save}
      />
    );
  }
}

TrainingEditPageContainer.propTypes = {
  params: React.PropTypes.any.isRequired,
}
