import React from 'react';
import PropTypes from 'prop-types';
import { InlineDatePicker as MuiInlineDatePicker } from 'material-ui-pickers';


const propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
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

const DateField = ({
  field, values, touched, errors, handleChange, setFieldValue,
}) => (
  <MuiInlineDatePicker
    clearable
    keyboard
    disablePast
    name={field.name}
    label={field.label}
    required={Boolean(field.required)}
    disabled={Boolean(field.disabled)}
    value={values[field.name]}
    error={Boolean(touched[field.name] && errors[field.name])}
    helperText={touched[field.name] && errors[field.name] ? errors[field.name] : ''}
    variant="outlined"
    fullWidth
    onChange={(value) => {
      setFieldValue(field.name, value);

      if (handleChange) {
        handleChange(value, setFieldValue);
      }
    }}
    {...field.customProps}
  />
);

DateField.propTypes = propTypes;
export default DateField;
