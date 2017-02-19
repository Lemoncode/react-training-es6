import {createStore, compose, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {reducers} from './reducers';

export const store = createStore(
  reducers,
  applyMiddleware(reduxThunk),
);
