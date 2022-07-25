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
  const iter = (tree, fileName) => {
    const result = tree.flatMap((node) => {
      const { name, value, type } = node;
      const makePath = [...fileName, name].join('.');
      switch (type) {
        case 'added':
          return `Property '${makePath}' was added with value: ${presentValue(value)}`;
        case 'deleted':
          return `Property '${makePath}' was removed`;
        case 'nested':
          return `${iter(value, [makePath])}`;
        case 'changed':
          return `Property '${makePath}' was updated. From ${presentValue(node.value1)} to ${presentValue(node.value2)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Type: ${type} is undefined`);
      }
    });
    return result.join('\n');
  };
  return iter(diff, []);
};

export default plain;
