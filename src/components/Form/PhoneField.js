import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  InputAdornment,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask';

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
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%',
  },
});


function PhoneMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      showMask
    />
  );
}

PhoneMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const PhoneField = ({
  field, values, touched, errors, handleChange, classes,
}) => (
  <div className={classes.container}>
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor={field.name}>{field.label}</InputLabel>
      <Input
        id={field.name}
        inputComponent={PhoneMask}
        name={field.name}
        type={field.type}
        placeholder=""
        InputProps={{
          startAdornment: (
            // eslint-disable-next-line
            field.icon ? (
              <InputAdornment>
                {
                  // eslint-disable-next-line
                  field.icon}
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
      {touched[field.name] && errors[field.name] && (
        <FormHelperText error>{errors[field.name]}</FormHelperText>
      )}
    </FormControl>
  </div>
);

PhoneField.propTypes = propTypes;
export default withStyles(styles)(PhoneField);
