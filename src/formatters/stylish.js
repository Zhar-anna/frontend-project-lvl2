import _ from 'lodash';

const indent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const stringify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.map((key) => {
    const prop = data[key];

    return `${indent(depth + 1)}  ${key}: ${stringify(prop, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n  ${indent(depth)}}`;
};
//   const indentForKey = replacer.repeat(depth + 3);
//   const indentForBracket = replacer.repeat(depth + 1);
//   const lines = Object.entries(data)
//     .map(([key, value]) => `${indentForKey}${key}: ${stringify(value, depth + 2, replacer)}`);

//   return ['{', ...lines, `${indentForBracket}}`].join('\n');
// };
const stylish = (diff, depth = 0) => {
  const {
    name, value, type, value1, value2, children,
  } = diff;
  // const indent = replacer.repeat(depth);
  // const indentForBracket = replacer.repeat(depth + 1);

  // const makeLine = (val, mark) => `${indent}${mark} ${name}: ${stringify(val, depth, replacer)}`;

  switch (type) {
    case 'root': {
      const result = children.flatMap((child) => stylish(child, depth + 1));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = children.flatMap((child) => stylish(child, depth + 1));
      return `${indent(depth)}  ${name}: {\n${result.join('\n')}\n${indent(depth)}  }`;
    }
    case 'added':
      return `${indent(depth)}+ ${name}: ${stringify(value, depth)}`;
    case 'deleted':
      return `${indent(depth)}- ${name}: ${stringify(value, depth)}`;
    case 'unchanged':
      return `${indent(depth)}  ${name}: ${stringify(value, depth)}`;
    case 'changed': {
      const removed = `${indent(depth)}- ${name}: ${stringify(value1, depth)}`;
      const added = `${indent(depth)}+ ${name}: ${stringify(value2, depth)}`;
      return `${removed}\n${added}`;
    }
    default:
      throw new Error(`Type: ${type} is undefined`);
  }
};
// const stylish = (diff, replacer = '  ') => {
//   const iter = (tree, depth) => tree.map((node) => {
//     const { name, value, type } = node;
//     const indent = replacer.repeat(depth);
//     const indentForBracket = replacer.repeat(depth + 1);

//     const makeLine = (val, mark) => `${indent}${mark} ${name}:
// ${stringify(val, depth, replacer)}`;

//     switch (type) {
//       case 'added':
//         return makeLine(value, '+');
//       case 'deleted':
//         return makeLine(value, '-');
//       case 'nested':
//         return `${indent}  ${name}: ${['{', ...iter(value,
// depth + 2), `${indentForBracket}}`].join('\n')}`;
//       case 'unchanged':
//         return makeLine(value, ' ');
//       case 'changed':
//         return [`${makeLine(node.value1, '-')}`,
//           `${makeLine(node.value2, '+')}`].join('\n');
//       default:
//         throw new Error(`Type: ${type} is undefined`);
//     }
//   });
//   const stylishDiff = iter(diff, 1);
//   return ['{', ...stylishDiff, '}'].join('\n');
// };

export default stylish;
