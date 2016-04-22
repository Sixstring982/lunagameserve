import { combineReducers } from 'redux';
import resolution from './resolution';
import mandelbrot from './mandelbrot';
import palette from './palette';

const MandelbrotReducers = combineReducers({
  resolution,
  mandelbrot,
  palette,
});

export default MandelbrotReducers;
