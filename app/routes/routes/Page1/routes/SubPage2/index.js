module.exports = {
  name: 'SubPage2',
  path: 'subpage2',
  getComponent(nextState, cb){
    require.ensure([], (require) => {
      cb(null, require('./components/SubPage2').default);
    });
  }
};
