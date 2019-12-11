import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField } from '@material-ui/core';

import InputAdornment from '@material-ui/core/InputAdornment';

const propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    variant: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    customProps: PropTypes.oneOfType([PropTypes.object]),
  }).isRequired,
  values: PropTypes.oneOfType([PropTypes.object]).isRequired,
  touched: PropTypes.oneOfType([PropTypes.object]).isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleChange: PropTypes.func.isRequired,
};

const TextField = ({
  field, values, touched, errors, handleChange,
}) => (
  <MuiTextField
    name={field.name}
    label={field.label}
    type={field.type}
    InputProps={{
      startAdornment: (
        field.icon ? (
          <InputAdornment>
            {field.icon}
          </InputAdornment>
        ) : null
      ),
    }}
    required={Boolean(field.required)}
    disabled={Boolean(field.disabled)}
    value={values[field.name]}
    error={Boolean(touched[field.name] && errors[field.name])}
    helperText={touched[field.name] && errors[field.name] ? errors[field.name] : ''}
    fullWidth
    variant={field.variant}
    onChange={handleChange}
    {...field.customProps}
  />
);

TextField.propTypes = propTypes;
export default TextField;
