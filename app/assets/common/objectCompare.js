import _ from 'lodash';

export const isEqual = (a, b) => {
  if (a === null && b === null){
    return true;
  } else if (a === null || b === null){
    return false;
  }

  if (a instanceof Date && b instanceof Date){
    return a.getTime() === b.getTime();
  } else if (a instanceof Date || b instanceof Date){
    return false;
  }

  const aIsARef = isRefType(a);
  const bIsARef = isRefType(b);
  if (aIsARef && bIsARef){
    if (a === b){
      return true;
    }
    const keysOfA = Object.keys(a);
    const keysOfB = Object.keys(b);
    if (_.difference(keysOfA, keysOfB).length === 0 && _.difference(keysOfB, keysOfA).length === 0){
      for (let i = 0; i < keysOfA.length; i++){
        if (!isEqual(a[keysOfA[i]], b[keysOfA[i]])){
          return false;
        }
      }
      return true;
    }
    return false;
  } else if (!aIsARef && !bIsARef){
    return a === b;
  }
  return false;
};

const isRefType = (a) => {
  switch (typeof a){
    case 'object':
    case 'function':
      return true;
    default:
      return false;
  }
};
