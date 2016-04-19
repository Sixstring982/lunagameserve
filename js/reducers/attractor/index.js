import { combineReducers } from 'redux';
import resolution from './resolution';
import mandelbrot from './mandelbrot';
import palette from './palette';

const AttractorReducers = combineReducers({
  resolution,
  mandelbrot,
  palette,
});

export default AttractorReducers;
