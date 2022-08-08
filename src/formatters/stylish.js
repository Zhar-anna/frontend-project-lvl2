import _ from 'lodash';

const makeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const stringify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.map((key) => {
    const prop = data[key];

    return `${makeIndent(depth + 1)}  ${key}: ${stringify(prop, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n  ${makeIndent(depth)}}`;
};

const stylish = (diff, depth = 0) => {
  const {
    name, value, type, value1, value2, children,
  } = diff;

  switch (type) {
    case 'root': {
      const result = children.flatMap((child) => stylish(child, depth + 1));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = children.flatMap((child) => stylish(child, depth + 1));
      return `${makeIndent(depth)}  ${name}: {\n${result.join('\n')}\n${makeIndent(depth)}  }`;
    }
    case 'added':
      return `${makeIndent(depth)}+ ${name}: ${stringify(value, depth)}`;
    case 'deleted':
      return `${makeIndent(depth)}- ${name}: ${stringify(value, depth)}`;
    case 'unchanged':
      return `${makeIndent(depth)}  ${name}: ${stringify(value, depth)}`;
    case 'changed': {
      const removed = `${makeIndent(depth)}- ${name}: ${stringify(value1, depth)}`;
      const added = `${makeIndent(depth)}+ ${name}: ${stringify(value2, depth)}`;
      return `${removed}\n${added}`;
    }
    default:
      throw new Error(`Type: ${type} is undefined`);
  }
};

export default stylish;
