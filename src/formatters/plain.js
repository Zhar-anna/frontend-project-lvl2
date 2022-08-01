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

const plain = (diff, path = '') => {
  const {
    type, children, name, value, value1, value2,
  } = diff;
  switch (type) {
    case 'root': {
      const result = children.flatMap((child) => plain(child, name));
      return result.join('\n');
    }
    case 'nested': {
      const result = children.flatMap((child) => plain(child, `${path}${name}.`));
      return result.join('\n');
    }
    case 'added':
      return `Property '${path}${name}' was added with value: ${presentValue(value)}`;
    case 'deleted':
      return `Property '${path}${name}' was removed`;
    case 'unchanged':
      return [];
    case 'changed':
      return `Property '${path}${name}' was updated. From ${presentValue(value1)} to ${presentValue(value2)}`;
    default:
      throw new Error(`Type: ${type} is undefined`);
  }
};

export default plain;
