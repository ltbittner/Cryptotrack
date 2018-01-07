import {
  selectors as BuySelectors
} from './buys/buys';

import {
  actions as PriceActions
} from './prices/prices';

import {
  selectors as WatchSelectors
} from './watches/watches';

import { getCurrentPrice } from '../services/bittrex';

export const types = {
  UPDATE_PRICE: 'shared/UPDATE_PRICE',
};

export const updateCurrentPrices = () => async (dispatch, getState) => {

  dispatch(PriceActions.fetchBTCPrice());

  const allBuys = BuySelectors.getBuysAsArray(getState());
  const allWatches = WatchSelectors.getWatchesAsArray(getState());

  const buySymbols = allBuys.reduce((acc, buy) => {
    acc[buy.symbol] = true;
    return acc;
  }, {})

  const allSymbols = allWatches.reduce((acc, watch) => {
    acc[watch.symbol] = true;
    return acc;
  }, buySymbols);

  Object.keys(allSymbols).forEach(async (symbol) => {
    const price = await getCurrentPrice(symbol);
    dispatch({
      type: types.UPDATE_PRICE,
      payload: {
        symbol,
        price
      }
    })
  });
}