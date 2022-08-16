import _ from 'lodash';

const checkValueFormat = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff, fileName) => {
  const {
    type, children, name, value, value1, value2,
  } = diff;
  const filePath = [...fileName, name].join('.');
  switch (type) {
    case 'unchanged':
      return [];
    case 'root': {
      const result = children.flatMap((child) => plain(child, name));
      return result.join('\n');
    }
    case 'nested': {
      const result = children.flatMap((child) => `${plain(child, [filePath])}.`);
      return result.join('\n');
    }
    case 'added':
      return `Property '${filePath}' was added with value: ${checkValueFormat(value)}`;
    case 'deleted':
      return `Property '${filePath}' was removed`;
    case 'changed':
      return `Property '${filePath}' was updated. From ${checkValueFormat(value1)} to ${checkValueFormat(value2)}`;
    default:
      throw new Error(`Type: ${type} is undefined`);
  }
};

export default plain;
