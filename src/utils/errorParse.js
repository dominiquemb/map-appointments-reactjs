const errorParse = (error) => {
  if (error && error.response && error.response.data) {
    const { message } = error.response.data;

    return Array.isArray(message) ? message : [message];
  }
  return null;
};

export default errorParse;
