module.exports = {
  name: 'Page2',
  path: 'page2',
  getComponent(nextState, cb){
    require.ensure([], (require) => {
      cb(null, require('./components/Page2').default);
    });
  }
};
