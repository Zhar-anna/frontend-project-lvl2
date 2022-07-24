import _ from 'lodash';

const presentValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  // если это строка - вернуть строку
};
const plain = (diff) => {
  const iter = (tree, fileName) => {
    const result = tree.flatMap((node) => {
      const { name, value, type } = node;
      const makeLine = (path, type, value1, value2, value) => `Property '${path}' was ${type}`;
    });
    
  };

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
