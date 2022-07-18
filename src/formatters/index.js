const getFormat = (path) => {
  const format = path.split('.').reverse()[0];
  return format;
};

export default getFormat;
