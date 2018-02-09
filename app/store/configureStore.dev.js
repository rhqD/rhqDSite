import {createStore, applyMiddleware, compose} from 'redux';
import {persistState} from 'redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../routes/rootReducer';
import ReduxDevTools from '../devTools/ReduxDevTools';
import Worker from './reducer.worker';


export default function configureStore(initialState){
  debugger
  const reducerWorker = new Worker();
  reducerWorker.postMessage({data: 'asd'});
  const workerReducerMiddleware = (store) => (next) => (action) => {
    debugger
    reducerWorker.postMessage(action);
    reducerWorker.onmessage = (event) => {next({
      type: 'newState',
      data: event.data
    });};
    next(action);
  }

  const enhancer = compose(
    applyMiddleware(thunk, createLogger(), workerReducerMiddleware),
    ReduxDevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&#]+)\b/
      )
    )
  );

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  if (module.hot){
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../routes/rootReducer', () => {
      const nextRootReducer = require('../routes/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
