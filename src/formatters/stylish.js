import _ from 'lodash';
const stringify = (data, depth, replacer) => {
  if (!_.isObject(data)) {
    return data;
  }

  const indentForKey = replacer.repeat(depth + 3);
  const indentForBracket = replacer.repeat(depth + 1);
  const lines = Object.entries(data)
    .map(([key, value]) => `${indentForKey}${key}: ${stringify(value, depth + 2, replacer)}`);

  return ['{', ...lines, `${indentForBracket}}`].join('\n');
};

const stylish = (diff, replacer = '  ') => {
  const iter = (tree, depth) => tree.map((node) => {
    const { name, value, type } = node;
    const indent = replacer.repeat(depth);
    const indentForBracket = replacer.repeat(depth + 1);

    const makeLine = (val, mark) => `${indent}${mark} ${name}: ${stringify(val, depth, replacer)}`;

    switch (type) {
      case 'added':
        return makeLine(value, '+');
      case 'deleted':
        return makeLine(value, '-');
      case 'nested':
        return `${indent}  ${name}: ${['{', ...iter(value, depth + 2), `${indentForBracket}}`].join('\n')}`;
      case 'unchanged':
        return makeLine(value, ' ');
      case 'changed':
        return [`${makeLine(node.value1, '-')}`,
          `${makeLine(node.value2, '+')}`].join('\n');
      default:
        throw new Error(`Type: ${type} is undefined`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default stylish;
// const stylish = (tree, space = '  ', spaceCount = 1) => {
//   const indent = n => space.repeat(n * spaceCount);
//   const iter = (node, depth) => {
//     if (!_.isObject(node)) {
//       return node;
//     }
//     const result = node.flatMap((item) => {
//       switch (item.type) {
//         case 'deleted':
//           return `${indent(depth)}- ${item.name}: ${item.value}`;
//         case 'added':
//           return `${indent(depth)}+ ${item.name}: ${item.value}`;
//         case 'nested':
//           return `${indent(depth)}  ${item.name}: {${iter(item.value, depth + 1)}${indent(depth)}  }`;
//         case 'changed':
//           return `${indent(depth)}- ${item.name}: ${item.value1}\n${indent(depth)}+ ${item.name}: ${item.value2}`;
//         case 'unchanged':
//           return `${indent(depth)}  ${item.name}: ${item.value}`;
//         default:
//           throw new Error(`Unknown type: '${item.type}'`);
//       }
//     });
//     return `\n${result.join('\n')}\n`;
//   };
//   return `{${iter(tree, 1)}}`;
// };

// export default stylish;
