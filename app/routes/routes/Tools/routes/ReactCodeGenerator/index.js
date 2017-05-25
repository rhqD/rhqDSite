module.exports = {
  name: 'SubPage1',
  path: 'subpage1',
  getComponent(nextState, cb){
    require.ensure([], (require) => {
      cb(null, require('./components/SubPage1').default);
    });
  }
};
