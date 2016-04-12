import { combineReducers } from 'redux';
import width from './width';
import height from './height';
import g from './g';

const AttractorReducers = combineReducers({
  width,
  height,
  g,
});

export default AttractorReducers;
