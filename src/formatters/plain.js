import _ from 'lodash';

const presentValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const iter = (node, path = '') => {
      const { name, value, type, children } = node;
      // const makePath = [...fileName, name].join('.');
      switch (type) {
        case 'root': {
          const result = children.flatMap((child) => iter(child, name));
          return result.join('\n');
        }
        case 'nested': {
          const result = children.flatMap((child) => iter(child, `${path}${name}.`));
          return result.join('\n');
        }
        case 'added':
          return `Property '${path}${name}' was added with value: ${presentValue(value)}`;
        case 'deleted':
          return `Property '${path}${name}' was removed`;
        
        case 'changed':
          return `Property '${path}${name}' was updated. From ${presentValue(node.value1)} to ${presentValue(node.value2)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Type: ${type} is undefined`);
      }
    };
     return iter(diff);
  };

export default plain;
