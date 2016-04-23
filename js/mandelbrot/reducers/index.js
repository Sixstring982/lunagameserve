import { combineReducers } from 'redux';
import resolution from './resolution';
import mandelbrot from './mandelbrot';

const MandelbrotReducers = combineReducers({
  resolution,
  mandelbrot,
});

export default MandelbrotReducers;
