import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText } from '@material-ui/core';
import Autocomplete from '../Autocomplete/Autocomplete';

const propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    customProps: PropTypes.oneOfType([PropTypes.object]),
  }).isRequired,
  values: PropTypes.oneOfType([PropTypes.object]).isRequired,
  touched: PropTypes.oneOfType([PropTypes.object]).isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

const AutocompleteField = ({
  field, touched, errors, setFieldValue,
}) => {
  const { customProps } = field;
  const { handleOnChange = null, ...restCustomProps } = customProps;

  return (
    <FormControl error={Boolean(touched[field.name] && errors[field.name])} fullWidth>
      <Autocomplete
        disabled={field.disabled || false}
        placeholder={`${field.label} ${field.required ? '*' : ''}`}
        onChange={(value) => {
          setFieldValue(field.name, value);

          if (handleOnChange) {
            handleOnChange(value, setFieldValue);
          }
        }}
        {...restCustomProps}
      />
      {touched[field.name] && errors[field.name] && (
        <FormHelperText error>{errors[field.name]}</FormHelperText>
      )}
    </FormControl>
  );
};

AutocompleteField.propTypes = propTypes;
export default AutocompleteField;
