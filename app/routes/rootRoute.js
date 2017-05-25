module.exports = {
  path: '/',
  name: 'home',
  component: require('./components/App').default,
  getChildRoutes(location, cb){
    require.ensure([], (require) => {
      if (module.hot){
        module.hot.accept([
          './routes/Login'
        ], () => {
          cb(null, [
            require('./routes/Login')
          ]);
        });
      }

      cb(null, [
        require('./routes/Login')
      ]);
    });
  }
};
