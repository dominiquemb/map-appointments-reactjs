import React from 'react';
import {
  FormLabel,
  RadioGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Radio as MuiRadio,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  shape, string, bool, oneOf, oneOfType, object, func, number, arrayOf,
} from 'prop-types';

const styles = () => ({
  root: {
    display: 'block',
    marginBottom: -30,
  },
  helperText: {
    marginTop: 0,
  },
  direction: {
    flexDirection: 'row',
  },
});

const propTypes = {
  field: shape({
    name: string.isRequired,
    label: string.isRequired,
    required: bool,
    disabled: bool,
    radioGroup: arrayOf(
      shape({
        checked: bool,
        disabled: bool,
        value: oneOfType([string, number]).isRequired,
        label: oneOfType([string, number]).isRequired,
        color: oneOf(['primary', 'secondary', 'default']).isRequired,
      }),
    ),
    customProps: oneOfType([object]),
  }).isRequired,
  values: oneOfType([object]).isRequired,
  touched: oneOfType([object]).isRequired,
  errors: oneOfType([object]).isRequired,
  handleChange: func.isRequired,
  classes: oneOfType([object]).isRequired,
};

const Radio = ({
  field, values, handleChange, touched, errors, classes,
}) => (
  <FormControl
    component="fieldset"
    className={classes.root}
    required={field.required}
    error={Boolean(touched[field.name] && errors[field.name])}
  >
    {field.label && (
    <FormLabel component="legend">
      {field.label}
    </FormLabel>
    )}
    <RadioGroup
      name={field.name}
      value={values[field.name]}
      onChange={handleChange}
      className={classes.direction}
    >
      {field.radioGroup.map((item, key) => (
        <FormControlLabel
          key={String(key)}
          label={item.label}
          value={item.value}
          disabled={Boolean(item.disabled)}
          control={<MuiRadio color={item.color} checked={item.checked} {...field.customProps} />}
        />
      ))}
    </RadioGroup>
    {touched[field.name] && errors[field.name] && (
      <FormHelperText className={classes.helperText}>
        {errors[field.name]}
      </FormHelperText>
    )}
  </FormControl>
);
Radio.propTypes = propTypes;
export default withStyles(styles, { withTheme: true })(Radio);
