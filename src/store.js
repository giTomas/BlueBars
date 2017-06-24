import {  createStore } from 'redux';

const initialState = {
  show: true,
}

const showReducer = (state=initialState, action) => {
  if (action.type === 'TOGGLE') {
    return {...state, show: !state.show}
  }
  else {
    return state;
  }
}

const store = createStore(showReducer);

export default store;
