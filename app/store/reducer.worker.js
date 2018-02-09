var app = require('../routes/reducers').default;
debugger
let state = undefined;
onmessage = (event) => {
  debugger
  const action = event.data;
  state = app(state, action);
  postMessage(state);
}
