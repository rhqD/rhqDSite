const actionNameFormat = (actionName) => {
 return actionName.replace(/([A-Z])/g,"_$1").toUpperCase();
}

export {
  actionNameFormat
};
