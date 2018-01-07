import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import buys from './buys/buys';
import prices from './prices/prices';
import nav from './nav/nav';
import watches from './watches/watches';

const reducer = combineReducers({
  buys,
  prices,
  nav,
  watches
});

const middleware = [
  thunk,
  logger
];

const store = createStore(reducer, applyMiddleware(...middleware))
export default store;