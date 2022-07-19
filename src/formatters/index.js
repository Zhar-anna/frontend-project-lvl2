const getFormat = (path) => {
  const format = path.split('.').reverse()[0];
  return format;
};

export default getFormat;
// import stylish from './stylish.js';

// export default (data, format) => {
//   switch (format) {
//     case 'stylish':
//       return stylish(data);
//     default:
//       throw new Error(`Unknown format: ${format}`);
//   }
// };