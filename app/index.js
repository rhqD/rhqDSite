import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import Root from './root';
import configureStore from './store';
import routes from './routes/rootRoute';
import {AppContainer} from 'react-hot-loader';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root');

const renderApp = () => {
  render(
    <AppContainer>
      <Root
        store={store}
        history={history}
        rootRoute={routes}
      />
    </AppContainer>,
    rootElement
  );
}

renderApp();

if (module.hot){
  module.hot.accept(['./root', './routes/rootRoute'], () => {
    renderApp();
  });
}
