import { combineReducers } from 'redux';
import resolution from './resolution';
import g from './g';
import window from './window';

const AttractorReducers = combineReducers({
  g,
  window,
  resolution,
});

export default AttractorReducers;
