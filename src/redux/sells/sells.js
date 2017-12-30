
const types = {
  ADD_SELL: 'buys/ADD_SELL'
};

const initialState = {
  sells: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADD_SELL:
      {
        return state;
      }
    default:
      return state;  
  }
}
