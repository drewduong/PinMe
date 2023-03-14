import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'

// Import reducers here
import boardReducer from './boards';
import pinReducer from './pins';
import userReducer from './users';
import followerReducer from './followers';

const rootReducer = combineReducers({
  session,
  boards: boardReducer,
  pins: pinReducer,
  users: userReducer,
  followers: followerReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
