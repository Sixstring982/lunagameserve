import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ElementaryReducers from './reducers/elementary';
import ElementaryApp from './components/ElementaryApp.jsx';
import { initialize } from './actions/ElementaryActions';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  ElementaryReducers,
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
    <ElementaryApp />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(initialize());
