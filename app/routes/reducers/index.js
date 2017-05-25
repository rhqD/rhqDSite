import {combineReducers} from 'redux';
import {createCommonReducer} from '@/common/reducerGenerator';
import * as types from '../actions/consts';
const loginAlready = {
  [types.LOGIN_SUCCESS]: (state, action) => {
    return true;
  }
}

const state = combineReducers({
  loginAlready: createCommonReducer(false, loginAlready)
})
