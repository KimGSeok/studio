import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import promiseMiddle from "redux-promise"; // Promise
import ReduxThunk from "redux-thunk"; // Function
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const configureStore = () =>{

  // Parameter
  // const logger = createLogger() // Get Log
  const middlewares = [ ReduxThunk, promiseMiddle ];
  const enhancer =
    process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, { debug: true });

export default wrapper;