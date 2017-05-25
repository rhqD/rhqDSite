import {actionNameFormat} from './helper';

const generateConsts = ({renderRequest, renderSuccess, renderFailure, actionNamePrefix, actionName}) => {
  const resArr = [];
  const formattedActionName = actionNameFormat(actionName);
  if (renderRequest){
    resArr.push(renderConst(actionNamePrefix, formattedActionName, 'REQUEST'));
  }
  if (renderSuccess){
    resArr.push(renderConst(actionNamePrefix, formattedActionName, 'SUCCESS'));
  }
  if (renderFailure){
    resArr.push(renderConst(actionNamePrefix, formattedActionName, 'FAILURE'));
  }
  return resArr.join('\n');
}

const renderConst = (actionNamePrefix, formattedActionName, state) => {
  return `export const ${formattedActionName}_${state} = '${actionNamePrefix}_${formattedActionName}_${state}';`;
}

export {
  generateConsts
};
