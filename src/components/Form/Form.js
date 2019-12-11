import React from 'react';
import {
  oneOfType, object, func, arrayOf, shape, string, bool, number, oneOf,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Formik } from 'formik';

import TextField from './TextField';
import AutocompleteField from './AutocompleteField';
import SelectField from './SelectField';
import UploadField from './UploadField';
import CheckBox from './CheckBox';
import DateField from './DateField';
import PhoneField from './PhoneField';

import { getFormInitialValues, getFormValidations } from './utils';

const styles = theme => ({
  btn: {
    marginTop: '10px',
  },
  noMargin: {
    marginBottom: 0,
  },
  reset: {
    padding: '10px 30px',
    marginRight: theme.spacing.unit * 2,
  },
});

const propTypes = {
  classes: oneOfType([object]).isRequired,
  cornerButtons: bool,
  inlineButtons: bool,
  hideButtons: bool,
  onSubmit: func.isRequired,
  fields: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
      label: string.isRequired,
      type: string.isRequired,
      validateAs: string.isRequired,
      defaultVal: oneOfType([string, number]),
      required: bool.isRequired,
      disabled: bool,
      span: shape({
        md: number.isRequired,
        sm: number.isRequired,
        xs: number.isRequired,
      }),
      customProps: oneOfType([object]),
    }),
  ).isRequired,
  submitColor: oneOf(['default', 'primary', 'secondary']),
  submitLabel: string,
  columns: number,
  spacing: number,
  reset: bool,
  onReset: func,
  resetLabel: string,
  isResetting: bool,
  readOnly: bool,
};

const defaultProps = {
  submitColor: 'primary',
  submitLabel: 'Submit',
  columns: 1,
  cornerButtons: false,
  inlineButtons: false,
  hideButtons: false,
  spacing: 0,
  reset: false,
  onReset: null,
  resetLabel: 'Reset',
  isResetting: false,
  readOnly: false,
};

const renderField = (props) => {
  let element = null;
  const { field } = props;

  switch (field.type) {
    case 'text':
      element = <TextField {...props} />;
      break;
    case 'select':
      element = <SelectField {...props} />;
      break;
    case 'autocomplete':
      element = <AutocompleteField {...props} />;
      break;
    case 'upload':
      element = <UploadField {...props} />;
      break;
    case 'checkbox':
      element = <CheckBox {...props} />;
      break;
    case 'date':
      element = <DateField {...props} />;
      break;
    case 'phone':
      element = <PhoneField {...props} />;
      break;
    default:
      element = <TextField {...props} />;
      break;
  }
  return element;
};

const Form = ({
  classes,
  fields,
  onSubmit,
  submitColor,
  submitLabel,
  cornerButtons,
  inlineButtons,
  hideButtons,
  columns,
  spacing,
  reset,
  onReset,
  resetLabel,
  isResetting,
  readOnly,
}) => {
  const initialValues = getFormInitialValues(fields);
  const validations = getFormValidations(fields);

  let maxSize = 12;
  let minSize = Math.round(maxSize / columns);
  let btnBlock = columns === 1;

  let useCornerButtons = cornerButtons;

  if (inlineButtons) {
    maxSize = 10;
    minSize = Math.round(maxSize / columns);
    btnBlock = columns === 1;
    useCornerButtons = false;
  }

  let fieldList = fields;
  if (readOnly) {
    fieldList = fields.map(field => Object.assign(field, { disabled: true }));
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={async (values, props) => {
        await onSubmit(values, props);
      }}
      onReset={async (values, props) => {
        await onReset(values, props);
      }}
      render={({
        values,
        touched,
        errors,
        handleChange,
        isSubmitting,
        setFieldValue,
        handleReset,
        handleSubmit,
      }) => (
        <form autoComplete="off" onSubmit={handleSubmit} noValidate>
          <Grid spacing={spacing} container justify="flex-start">
            {fieldList.length > 0 && (fieldList.map(field => (
              <Grid
                xs={((field.maxSize) ? (field.maxSize) : maxSize)}
                sm={((field.minSize) ? (field.minSize) : minSize)}
                md={((field.minSize) ? (field.minSize) : minSize)}
                key={field.id}
                item
              >
                <div className={classes.wrapper}>
                  {renderField(
                    {
                      field,
                      values,
                      touched,
                      errors,
                      handleChange,
                      setFieldValue,
                    },
                    readOnly,
                  )}
                </div>
              </Grid>
            ))
            )}

            {!useCornerButtons && (
            <Grid
              xs={12}
              sm={(inlineButtons ? 2 : minSize)}
              md={(inlineButtons ? 2 : minSize)}
              item
              container
              alignItems="flex-start"
              justify="space-around"
              wrap="nowrap"
            >
              {reset && !readOnly && !hideButtons && (
                <Button
                  className={`${classes.btn} ${classes.reset}`}
                  type="button"
                  color="default"
                  disabled={isResetting}
                  onClick={handleReset}
                >
                  {resetLabel}
                </Button>
              )}

              {submitLabel && !readOnly && !hideButtons && (
                <Button
                  className={`${classes.btn} ${btnBlock ? classes.wrapper : classes.noMargin}`}
                  type="submit"
                  variant="contained"
                  color={submitColor}
                  disabled={isSubmitting}
                  fullWidth={btnBlock}
                >
                  {submitLabel}
                </Button>
              )}

            </Grid>
            )}
            {useCornerButtons && !hideButtons && (
              <Grid
                xs={maxSize}
                sm={minSize}
                md={minSize}
                item
                container
                alignItems="center"
                justify="space-between"
                wrap="nowrap"
              >
                {reset && !readOnly && (
                <Button
                  className={`${classes.btn} ${classes.reset}`}
                  type="button"
                  color="default"
                  disabled={isResetting}
                  onClick={handleReset}
                >
                  {resetLabel}
                </Button>
                )}

                {submitLabel && !readOnly && (
                <Button
                  className={`${classes.btn} ${btnBlock ? classes.wrapper : classes.noMargin}`}
                  type="submit"
                  variant="contained"
                  color={submitColor}
                  disabled={isSubmitting}
                  fullWidth={false}
                >
                  {submitLabel}
                </Button>
                )}

              </Grid>
            )}
          </Grid>
        </form>
      )}
    />
  );
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
export default withStyles(styles, { withTheme: true })(Form);
