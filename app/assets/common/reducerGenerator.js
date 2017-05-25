/**
 * 帮助创建reducer
 * @param  {[type]} initialState [description]
 * @param  {[type]} handlers     [description]
 * @return {[type]}              [description]
 */
const createCommonReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action){
    if (handlers.hasOwnProperty(action.type)){
      return handlers[action.type](state, action);
    }
    return state;
  };
};

export {createCommonReducer};
