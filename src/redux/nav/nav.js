
const types = {
  SET_TAB: 'nav/SET_TAB'
}

const initialState = {
  tab: 'assets'
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch(type) {
    case types.SET_TAB:
      {
        const {tab} = payload;
        return {
          ...state,
          tab
        };
      }
    default:
      return state;
  }
}


const getCurrentTab = (state) => state.nav.tab;

export const selectors = {
  getCurrentTab
};

const setTab = (tab) => ({
  type: types.SET_TAB,
  payload: {
    tab
  }
})

export const actions = {
  setTab
}