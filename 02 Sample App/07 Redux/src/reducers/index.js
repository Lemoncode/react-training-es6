import {combineReducers} from 'redux';
import {loginReducer} from './login';
import {trainingReducer} from './training';

export const reducers = combineReducers({
  login: loginReducer,
  training: trainingReducer,
});
