
import { getCurrentBTCPrice } from '../../services/bittrex';

const types = {
  SET_BTC: 'prices/SET_BTC'
};

const inititalState = {
  BTC: 0
};

export default (state = inititalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_BTC:
      {
        const { price } = payload;
        return {
          ...state,
          BTC: price
        };
      } 
    default:
      return state;  
  }
}

const getBTCPrice = (state) => state.prices.BTC;

export const selectors = {
  getBTCPrice
}


const fetchBTCPrice = () => async (dispatch) => {
  const price = await getCurrentBTCPrice();
  dispatch({
    type: types.SET_BTC,
    payload: {
      price
    }
  });
}

export const actions = {
  fetchBTCPrice
};