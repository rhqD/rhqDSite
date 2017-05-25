import {routerReducer as routing} from 'react-router-redux';
import {combineReducers} from 'redux';
import app from './reducers';

const rootReducer = combineReducers({
  app,
  routing
});

export default rootReducer;
