import {combineReducers} from 'redux';
import {trainingListReducer} from './list';
import {trainingEditReducer} from './edit';

export const trainingReducer = combineReducers({
  list: trainingListReducer,
  edit: trainingEditReducer,
});
