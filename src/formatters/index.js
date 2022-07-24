import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormat = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'palin':
      return plain(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default chooseFormat;
