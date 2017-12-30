import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import buys from './buys/buys';
import sells from './sells/sells';
import prices from './prices/prices';

const reducer = combineReducers({
  buys,
  sells,
  prices
});

const middleware = [
  thunk,
  logger
];

const store = createStore(reducer, applyMiddleware(...middleware))
export default store;