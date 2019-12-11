import yup from './validations';

export const arrayToObject = (array, keyField) => array.reduce((obj, item) => {
  /* eslint-disable-next-line no-param-reassign */
  obj[item[keyField]] = item;
  return obj;
}, {});
export const getFormInitialValues = array => array.reduce((obj, item) => {
  /* eslint-disable-next-line no-param-reassign */
  obj[item.name] = item.defaultVal;
  return obj;
}, {});

export const getFormValidations = (array) => {
  const getValidation = (item) => {
    let validator = null;
    let schema = null;
    switch (item.validateAs) {
      case 'email':
        validator = yup.string().email();
        break;
      case 'password':
        schema = item.passwordSchema;
        validator = yup
          .string()
          .min(schema.min)
          .matches(schema.matches, schema.errorMsg);
        break;
      case 'confirm':
        schema = item.confirmSchema;
        validator = yup.string().oneOf([yup.ref(schema.compareAgainst)], schema.errorMsg);
        break;
      case 'string':
        validator = yup.string();
        break;
      case 'number':
        validator = yup.number();
        break;
      case 'mixed':
        validator = yup.mixed();
        break;
      case 'bool':
        validator = yup.boolean();
        break;
      case 'onlyTrue':
        validator = yup.boolean().oneOf([true], 'Please accept if you want to proceed');
        break;
      case 'onlyFalse':
        validator = yup.boolean().oneOf([false], 'Please not accept if you want to proceed');
        break;
      case 'date':
        validator = yup.string().required().nullable();
        break;
      default:
        validator = yup.string();
        break;
    }

    return validator;
  };

  return yup.object().shape(
    array.reduce((obj, item) => {
      let validator = null;

      if (typeof item.validateAs === 'object') {
        const items = {};

        Object.keys(item.validateAs).forEach((element) => {
          const tmpItem = { validateAs: item.validateAs[element] };
          items[element] = getValidation(tmpItem);
        });

        validator = yup
          .array()
          .of(yup.object().shape(items))
          .ensure();
      } else {
        validator = getValidation(item);
      }

      if (item.when) {
        validator = validator.when(item.when.fields, item.when.compare);
      } else if (item.required === true) {
        validator = validator.required(item.requiredMessage);
      } else {
        validator = validator.nullable().notRequired();
      }

      /* eslint-disable-next-line no-param-reassign */
      obj[item.name] = validator;
      return obj;
    }, {}),
  );
};
