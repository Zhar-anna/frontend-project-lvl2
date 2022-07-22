import _ from 'lodash';

// Реализуйте форматер, выводящий внутреннее дерево как показано сверху. Назовите его stylish.
// const  stringfy = (data, symbol, spaceCount) => {
//     if (!_.isObject(data)) {
//         return data;
//     }
//     const spaceForKey = spaceCount.repeat(symbol + 3);
//     const spaceForBracket = spaceCount.repeat(symbol + 1);
//     const line = Object.entries(data)
//       .map(([key, value]) => `${spaceForKey}${key}: ${stringfy(value, symbol, spaceCount)}`);
//       return ['{', ...line, `${spaceForBracket}}`].join('\n');
// };

// {
//     'key': key,
//     'same': значение, если ничего не менялось,
//     'deleted': значение, которое удалилось,
//     'added': значение, которое добавилось
//     'children': [если есть дети, они рекурсивно отображаются в массиве]
//     }
// И если значение ключа в обоих файлах объект, только тогда нужно запускать рекурсию.
const stylish = (tree, space = '  ', spaceCount = 1) => {
  const indent = n => space.repeat(n * spaceCount);
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return { ...node };
    }
    const result = node.flatMap((item) => {
      switch (item.type) {
        case 'deleted':
          return `${indent(depth)}- ${item.name}: ${item.value}`;
        case 'added':
          return `${indent(depth)}+ ${item.name}: ${item.value}`;
        case 'nested':
          return `${indent(depth)}  ${item.name}: {${iter(item.value, depth + 1)}${indent(depth)}  }`;
        case 'changed':
          return `${indent(depth)}- ${item.name}: ${item.value1}\n${indent(depth)}+ ${item.name}: ${item.value2}`;
        case 'unchanged':
          return `${indent(depth)}  ${item.name}: ${item.value}`;
        default:
          throw new Error(`Unknown type: '${item.type}'`);
      }
    });
    return `\n${result.join('\n')}\n`;
  };
  return `{${iter(tree, 1)}}`;
};

export default stylish;
