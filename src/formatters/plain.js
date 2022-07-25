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
  // записать name, потом провалиться в рекурсию
};

// Property 'common.follow' was added with value: false
// Property 'common.setting2' was removed
// Property 'common.setting3' was updated. From true to null
// Property 'common.setting4' was added with value: 'blah blah'
// Property 'common.setting5' was added with value: [complex value]
// Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
// Property 'common.setting6.ops' was added with value: 'vops'
// Property 'group1.baz' was updated. From 'bas' to 'bars'
// Property 'group1.nest' was updated. From [complex value] to 'str'
// Property 'group2' was removed
// Property 'group3' was added with value: [complex value]
//  Вывод для не изменившихся узлов делать не нужно.

export default plain;
