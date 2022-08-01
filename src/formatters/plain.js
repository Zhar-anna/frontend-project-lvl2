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

const plain = (tree, path = '') => {
  const result = tree.flatMap((node) => {
    const {
      name, type, value, children,
    } = node;
    switch (type) {
      case 'root': {
        return plain(children, name);
      }
      case 'nested': {
        return plain(children, `${path}${name}`);
      }
      case 'added':
        return `Property '${path}${name}' was added with value: ${presentValue(value)}`;
      case 'deleted':
        return `Property '${path}${name}' was removed`;
      case 'unchanged':
        return [];
      case 'changed':
        return `Property '${path}${name}' was updated. From ${presentValue(node.value1)} to ${presentValue(node.value2)}`;
      default:
        throw new Error(`Type: ${type} is undefined`);
    }
  });
  return result.join('\n');
};

export default plain;
