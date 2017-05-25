import {createStore, applyMiddleware, compose} from 'redux';
import {persistState} from 'redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../routes/rootReducer';
import ReduxDevTools from '../devTools/ReduxDevTools';

const enhancer = compose(
  applyMiddleware(thunk, createLogger()),
  ReduxDevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState){
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
