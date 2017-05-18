import { routerReducer as routing } from 'react-router-redux';
import { createStore, combineReducers } from 'redux';
import messages from '../reducers/messageReducer.js';

export const finalReducer = combineReducers({
  messages,
  routing,
});

export const createNewStore = (initialState) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    return createStore(
      finalReducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
  }
  return createStore(finalReducer, initialState);
};
