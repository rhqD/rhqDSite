module.exports = {
  name: 'Page1',
  path: 'page1',
  getComponent(nextState, cb){
    require.ensure([], (require) => {
      cb(null, require('./components/Page1').default);
    });
  },
  getChildRoutes(location, cb){
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/SubPage1'),
        require('./routes/SubPage2')
      ]);
    });
  }
};
