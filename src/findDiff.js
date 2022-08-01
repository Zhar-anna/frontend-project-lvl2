import _ from 'lodash';

const findDiff = (obj1, obj2) => {
  const sortedKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  const result = sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        children: findDiff(obj1[key], obj2[key]),
        type: 'nested',
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key,
        value: obj1[key],
        type: 'deleted',
      };
    }
    if (!_.has(obj1, key)) {
      return {
        name: key,
        value: obj2[key],
        type: 'added',
      };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        return {
          name: key,
          value1: obj1[key],
          value2: obj2[key],
          type: 'changed',
        };
      }
    }
    return {
      name: key,
      value: obj1[key],
      type: 'unchanged',
    };
  });
  return result;
};

const diffTree = (obj1, obj2) => ({ type: 'root', children: findDiff(obj1, obj2) });
export default diffTree;
