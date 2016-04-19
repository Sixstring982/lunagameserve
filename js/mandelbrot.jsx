import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AttractorReducers from './reducers/attractor/';
import { initialize } from './actions/AttractorActions';
import AttractorApp from './components/AttractorApp.jsx';

let store = createStore(AttractorReducers);

render(
  <Provider store={store}>
    <AttractorApp />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(initialize());
