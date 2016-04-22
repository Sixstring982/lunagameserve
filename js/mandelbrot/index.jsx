import React from 'react';
import Reducers from './reducers';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialize } from './actions';
import MandelbrotApp from './components/MandelbrotApp.jsx';

let store = createStore(Reducers);

render(
  <Provider store={store}>
    <MandelbrotApp />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(initialize());
