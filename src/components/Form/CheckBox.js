import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox as MUCheckbox,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    display: 'block',
    marginBottom: -30,
  },
  helperText: {
    marginTop: 0,
  },
});

const propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    customProps: PropTypes.oneOfType([PropTypes.object]),
  }).isRequired,
  values: PropTypes.oneOfType([PropTypes.object]).isRequired,
  touched: PropTypes.oneOfType([PropTypes.object]).isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const Checkbox = ({
  field, values, touched, errors, handleChange, classes, className,
}) => (
  <FormControl
    error={Boolean(touched[field.name] && errors[field.name])}
    component="fieldset"
    className={`${classes.root} ${className}`}
  >
    <FormControlLabel
      label={field.label}
      control={(
        <MUCheckbox
          name={field.name}
          value={String(values[field.name])}
          checked={Boolean(values[field.name])}
          required={field.required}
          disabled={field.disabled}
          onChange={handleChange}
          {...field.customProps}
        />
)}
    />
    {touched[field.name] && errors[field.name] && (
      <FormHelperText className={classes.helperText}>
        {errors[field.name]}
      </FormHelperText>
    )}
  </FormControl>
);

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
export default withStyles(styles, { withTheme: true })(Checkbox);
