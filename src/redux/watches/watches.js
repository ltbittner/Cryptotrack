import * as WriteActions from '../../firebase/writes/writes';
import * as ReadActions from '../../firebase/reads/reads';

import { types as SharedTypes } from '../shared';

const types = {
  ADD_WATCH: 'watches/ADD_WATCH',
  ADD_WATCHES: 'watches/ADD_WATCHES',
  DELETE_WATCH: 'watches/DELETE_WATCH'
};

const initialState = {
  watches: {}
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch(type) {
    case types.ADD_WATCH:
      {
        const {watches} = state;
        const watch = payload;
        const {id} = watch;

        return {
          ...state,
          watches: {
            ...watches,
            [id]: watch
          }
        };
      }
    case types.ADD_WATCHES:
      {
        const {data} = payload;
        return {
          ...state,
          watches: {
            ...state.watches,
            ...data
          }
        };
      }
    case SharedTypes.UPDATE_PRICE:
      {
        const { symbol, price } = payload;
        const { watches } = state;

        const ids = Object.keys(watches).filter((id) => {
          const watch = watches[id];
          return watch.symbol === symbol;
        })

        ids.forEach((id) => {
          watches[id] = { ...watches[id], currentPrice: price }
        })

        return {
          ...state,
          watches: { ...watches }
        };
      }
    case types.DELETE_WATCH:
      {
        const {id} = payload;
        const {watches} = state;
        delete watches[id];

        return {
          ...state,
          watches: { ...watches }
        };
      }
    default:
      return state;
  }
}

const getWatchesAsArray = (state) => Object.values(state.watches.watches);

export const selectors = {
  getWatchesAsArray
}


const addWatch = ({symbol, buyTarget}) => async (dispatch) => {
  const dispatchAction = (id) => {
    dispatch({
      type: types.ADD_WATCH,
      payload: {
        id,
        symbol,
        buyTarget
      }
    })
  }

  await WriteActions.addWatch({ symbol, buyTarget }, dispatchAction);
}

const fetchWatches = () => async (dispatch) => {
  const dispatchAction = (data) => {
    dispatch({
      type: types.ADD_WATCHES,
      payload: {
        data
      }
    });
  }

  await ReadActions.fetchWatches(dispatchAction);
}

const removeWatch = (id) => async (dispatch) => {
  await WriteActions.deleteWatch(id);

  dispatch({
    type: types.DELETE_WATCH,
    payload: {
      id
    }
  });
}

export const actions = {
  addWatch,
  fetchWatches,
  removeWatch
}
