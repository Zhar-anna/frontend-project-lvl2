import stylish from './stylish.js';

const chooseFormat = (data, format) => {
  if (format === 'stylish') {
    return stylish(data);
  }
};

export default chooseFormat;
