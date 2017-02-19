import * as React from 'react';
import {connect} from 'react-redux';
import {fetchTrainingStartAction} from './actions/fetchTraining';
import {trainingContentChangedAction} from './actions/trainingContentChanged';
import {saveTrainingStartAction} from './actions/saveTraining';
import {TrainingEditPage} from './page';

const mapStateToProps = (state, ownProps) => ({
  trainingId: Number(ownProps.params.id) || 0,
  training: state.training.edit.training,
  trainingErrors: state.training.edit.trainingErrors,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrainingById: (id) => dispatch(fetchTrainingStartAction(id)),
  onChange: (training, fieldName, value) =>
    dispatch(trainingContentChangedAction(training, fieldName, value)),
  save: (training) => dispatch(saveTrainingStartAction(training)),
});

export const TrainingEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainingEditPage);
