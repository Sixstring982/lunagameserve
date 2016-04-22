import React from 'react';
import Reducers from './reducers';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialize } from './actions';
import ElementaryApp from './components/ElementaryApp.jsx';

const store = createStore(Reducers);

render(
  <Provider store={store}>
    <ElementaryApp />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(initialize());
