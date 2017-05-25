module.exports = {
  name: 'login',
  path: 'login',
  getComponent(nextState, cb){
    require.ensure([], (require) => {
      cb(null, require('./components/LoginPage').default);
    });
  }
};
