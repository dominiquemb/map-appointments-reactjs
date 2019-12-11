import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, MenuItem, FormHelperText,
} from '@material-ui/core';

const propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    customProps: PropTypes.oneOfType([PropTypes.object]),
  }).isRequired,
  values: PropTypes.oneOfType([PropTypes.object]).isRequired,
  touched: PropTypes.oneOfType([PropTypes.object]).isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

const SelectField = ({
  field, values, touched, errors, handleChange, setFieldValue,
}) => {
  const { customProps } = field;
  const { handleOnChange = null, ...restCustomProps } = customProps;

  return (
    <FormControl
      error={Boolean(touched[field.name] && errors[field.name])}
      disabled={Boolean(field.disabled)}
      fullWidth
    >
      <InputLabel htmlFor="type" required={Boolean(field.required)}>
        {field.label}
      </InputLabel>
      <Select
        disabled={Boolean(field.disabled)}
        required={Boolean(field.required)}
        value={values[field.name]}
        onChange={(event) => {
          handleChange(event);

          if (field.customProps && handleOnChange) {
            handleOnChange(event.target.value, setFieldValue, values);
          }
        }}
        {...restCustomProps}
      >
        <MenuItem value="">
          <em>{field.placeholder}</em>
        </MenuItem>
        {restCustomProps.data.map(item => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {touched[field.name] && errors[field.name] && (
        <FormHelperText error>{errors[field.name]}</FormHelperText>
      )}
    </FormControl>
  );
};

SelectField.propTypes = propTypes;
export default SelectField;
