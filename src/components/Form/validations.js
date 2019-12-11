import * as yup from 'yup';

const lowerCase = str => str.toLowerCase(); // eslint-disable-line arrow-body-style
const upperCase = str => str.toUpperCase(); // eslint-disable-line arrow-body-style
const properCase = str => lowerCase(str).replace(/^\w|\s\w/g, upperCase); // eslint-disable-line arrow-body-style

const unCamelCase = (str) => {
  let parsed = str.replace(/([a-z\xE0-\xFF\0-9])([A-Z\xC0\xDF\0-9])/g, '$1 $2');
  parsed = parsed.toLowerCase();
  return properCase(parsed);
};

yup.setLocale({
  mixed: {
    required({ path }) {
      return `${unCamelCase(path)} is a required field.`;
    },
    oneOf() {
      return 'Please enter the allowed values';
    },
  },
  string: {
    email({ path }) {
      return `${unCamelCase(path)} must be a valid email.`;
    },
    min({ path, min }) {
      return `${unCamelCase(path)} must be at least ${min} characters.`;
    },
  },
});

export default yup;
