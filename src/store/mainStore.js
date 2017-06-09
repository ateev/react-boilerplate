import { routerReducer } from 'react-router-redux';
import { createStore, combineReducers } from 'redux';
import messages from '../reducers/messageReducer';

export const finalReducer = combineReducers({
  messages,
  router: routerReducer,
});

export const createNewStore = (initialState) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    return createStore(
      finalReducer,
      initialState,
      window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION(),
    );
  }
  return createStore(finalReducer, initialState);
};
