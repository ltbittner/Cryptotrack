import * as WriteActions from '../../firebase/writes/writes';
import * as ReadActions from '../../firebase/reads/reads';

import { getCurrentPrice } from '../../services/bittrex';

import { getPercentDiff } from '../../utils/math';

import {
  actions as PriceActions,
  selectors as PriceSelectors
} from '../prices/prices';

const types = {
  ADD_BUY: 'buys/ADD_BUY',
  ADD_BUYS: 'buys/ADD_BUYS',
  UPDATE_PRICE: 'buys/UPDATE_PRICE',
  DELETE_BUY: 'buys/DELETE_BUY',
  ADD_SELL: 'buys/ADD_SELL'
};

const initialState = {
  buys: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADD_BUYS:
      {
        const { buys } = payload;

        return {
          ...state,
          buys: {
            ...state.buys,
            ...buys
          }
        };
      }  
    case types.ADD_BUY:
      {
        const { buys } = state;
        const { id } = payload;
        return {
          ...state,
          buys: {
            ...buys,
            [id]: payload
          }
        };
      }
    case types.DELETE_BUY:
      {
        const { id } = payload;
        const { buys } = state;
        delete buys[id];

        return {
          ...state,
          buys: {...buys}
        };
      }  
    case types.UPDATE_PRICE:
      {
        const { symbol, price } = payload;
        const { buys } = state;

        const ids = Object.keys(buys).filter((id) => {
          const buy = buys[id];
          return buy.symbol === symbol;
        })

        ids.forEach((id) => {
          buys[id] = { ...buys[id], currentPrice: price }
        })

        return {
          ...state,
          buys: { ...buys }
        };
      }
    case types.ADD_SELL:
      {
        const { buys } = state;
        const { id, sell } = payload;
        const { buyId } = sell;

        const buy = buys[sell.buyId];
        const sells = buys.sells || [];
        sells.push(sell);


        return {
          ...state,
          buys: {
            ...buys,
            [buyId]: {
              ...buys[buyId],
              sells
            }
          }
        };

      }  
    default:
      return state;  
  }
}


const getBuysAsArray = (state) => {
  return Object.values(state.buys.buys) || [];
}

const getSellsForBuy = (state, id) => {
  return state.buys.buys[id].sells|| [];
}

const getTotalBTCValue = (state) => {
  return Object.values(state.buys.buys).reduce((acc, buy) => {
    return acc + (buy.buyPrice * buy.amount);
  }, 0);
};

const getTotalAveragePercentChange = (state) => {
  const sum = Object.values(state.buys.buys).reduce((acc, buy) => {
    return acc + Number(getPercentDiff(buy.buyPrice, buy.currentPrice));
  }, 0)
  return (sum / Object.values(state.buys.buys).length).toFixed(2);
}

const getTotalPercentChange = (state) => {
  return Object.values(state.buys.buys).reduce((acc, buy) => {
    return acc + Number(getPercentDiff(buy.buyPrice, buy.currentPrice));
  }, 0)
}


export const selectors = {
  getBuysAsArray,
  getTotalBTCValue,
  getTotalAveragePercentChange,
  getTotalPercentChange,
  getSellsForBuy
};



const addBuy = ({ buyPrice, symbol, amount }) => async (dispatch, getState) => {

  const dispatchAction = (id) => {
    dispatch({
      type: types.ADD_BUY,
      payload: {
        buyPrice,
        symbol,
        amount,
        id,
      }
    })
  }

  await WriteActions.addBuy(
    { buyPrice, symbol, amount },
    dispatchAction
  )

  dispatch(updateCurrentPrices());
}

const sellBuy = ({ id: buyId, amount, sellPrice }) => async (dispatch, getState) => {

  const dispatchAction = () => {
    dispatch({
      type: types.ADD_SELL,
      payload: {
        sell: {
          amount, sellPrice, buyId
        }
      }
    });
  }

  await WriteActions.addSell({ buyId, amount, sellPrice }, dispatchAction)
}

const deleteBuy = (id) => async (dispatch) => {
  await WriteActions.deleteBuy(id);

  dispatch({
    type: types.DELETE_BUY,
    payload: { id }
  });
}

const fetchBuys = (done) => async (dispatch) => {

  const dispatchAction = (buys) => {
    dispatch({
      type: types.ADD_BUYS,
      payload: {
        buys
      }
    })

    done();
  }

  ReadActions.fetchBuys(dispatchAction);
}

const updateCurrentPrices = () => async (dispatch, getState) => {

  dispatch(PriceActions.fetchBTCPrice());

  const allBuys = getBuysAsArray(getState());
  const symbols = allBuys.reduce((acc, buy) => {
    acc[buy.symbol] = true;
    return acc;
  }, {})

  Object.keys(symbols).forEach(async (symbol) => {
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

export const actions = {
  addBuy,
  fetchBuys,
  updateCurrentPrices,
  deleteBuy,
  sellBuy
}