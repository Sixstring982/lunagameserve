import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MandelbrotReducers from './reducers/mandelbrot/';
import { initialize } from './actions/MandelbrotActions';
import MandelbrotApp from './components/MandelbrotApp.jsx';

let store = createStore(MandelbrotReducers);

render(
  <Provider store={store}>
    <MandelbrotApp />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(initialize());
