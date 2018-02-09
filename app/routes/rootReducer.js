import {routerReducer as routing} from 'react-router-redux';
import {combineReducers} from 'redux';

const fakeApp = (state = {loginAlready: false}, action) => {
  if (action.type === 'newState'){
    return state;
  }
  return state;
};

const rootReducer = combineReducers({
  app: fakeApp,
  routing
});

export default rootReducer;
