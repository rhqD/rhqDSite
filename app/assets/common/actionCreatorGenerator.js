import {actionNameFormat} from './helper';
const generateActionCreator = ({renderRequest, renderSuccess, renderFailure, serverEndPoint, actionName, returnPromise, params, dispatchApiError}) => {
  const prepareArr = [];
  let result = '';
  if (renderRequest){
    prepareArr.push(generateAction(actionName, 'Request'));
  }
  if (renderSuccess){
    prepareArr.push(generateAction(actionName, 'Success'));
  }
  if (renderFailure){
    prepareArr.push(generateAction(actionName, 'Failure'));
  }
  result = prepareArr.join('\n');
  const param = {renderRequest, renderSuccess, renderFailure, actionName, serverEndPoint, params, dispatchApiError};
  const fetchFunc = returnPromise ? templeB(param) : temple(param);
  result += '\n';
  result += fetchFunc;
  return result;
}

const generateAction = (actionName, state) => {
  const formattedActionName = actionNameFormat(actionName);
  return `const ${actionName}${state} = (meta) => {\n  return {\n    type: types.${formattedActionName}_${state.toUpperCase()},\n    ...meta\n  };\n};\n`;
}

const temple = ({renderRequest, renderSuccess, renderFailure, actionName, serverEndPoint, params, dispatchApiError}) => {
  return `export const ${actionName} = (${params}) => (dispatch) => {\n` +
  `${renderRequest ? ('  dispatch(' + actionName + 'Request());\n') : ''}` +
  '  dispatch(changeShowWaitProgress(true));\n' +
  `  serviceApi(\`\${${serverEndPoint}}\`).then((result) => {\n` +
  `${renderSuccess ? ('    dispatch(' + actionName + 'Success());\n') : ''}` +
  '  }).catch((error) => {\n' +
  `${renderFailure ? ('    dispatch(' + actionName + 'Failure());\n') : ''}` +
  `${dispatchApiError ? ('    dispatchApiError({dispatch, error});\n') : ''}` +
  '  }).then(() => {\n' +
  '    dispatch(changeShowWaitProgress(false));\n' +
  '  });\n' +
  '};\n';
};

const templeB = ({renderRequest, renderSuccess, renderFailure, actionName, serverEndPoint, params, dispatchApiError}) => {
  return `export const ${actionName} = (${params}) => (dispatch) => {\n` +
  `${renderRequest ? ('  dispatch(' + actionName + 'Request());\n') : ''}` +
  '  dispatch(changeShowWaitProgress(true));\n' +
  `  return serviceApi(\`\${${serverEndPoint}}\`).then((result) => {\n` +
  `${renderSuccess ? ('    dispatch(' + actionName + 'Success());\n') : ''}` +
  '    dispatch(changeShowWaitProgress(false));\n' +
  '    return Promise.resolve();\n' +
  '  }).catch((error) => {\n' +
  `${renderFailure ? ('    dispatch(' + actionName + 'Failure());\n') : ''}` +
  `${dispatchApiError ? ('    dispatchApiError({dispatch, error});\n') : ''}` +
  '    dispatch(changeShowWaitProgress(false));\n' +
  '    return Promise.reject();\n' +
  '  });\n' +
  '};\n';
};

export {
  generateActionCreator
};
