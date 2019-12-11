import React from 'react';
import { Formik, FieldArray } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import {
  oneOfType,
  func,
  arrayOf,
  shape,
  string,
  bool,
  object,
  number,
  oneOf,
  array,
} from 'prop-types';

import TextField from './TextField';
import AutocompleteField from './AutocompleteField';
import SelectField from './SelectField';
import UploadField from './UploadField';
import CheckBox from './CheckBox';
import Radio from './Radio';

import { getFormInitialValues, getFormValidations } from './utils';

const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit * 2,
    color: '#248596',
    fontWeight: 500,
  },
  wrapper: {
    marginBottom: '30px',
  },
  noMargin: {
    marginBottom: 0,
  },
  reset: {
    padding: '10px 30px',
    marginRight: theme.spacing.unit * 2,
  },
  paper: {
    padding: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  checkBoxReset: {
    display: 'flex',
    marginBottom: 0,
  },
});

const fieldProps = {
  id: string.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  type: string.isRequired,
  validateAs: oneOfType([string, object]).isRequired,
  defaultVal: oneOfType([string, number, bool, array]),
  required: bool,
  disabled: bool,
  show: bool,
  customProps: oneOfType([object]),
};

const propTypes = {
  classes: oneOfType([object]).isRequired,
  onSubmit: func.isRequired,
  fields: arrayOf(
    shape({
      title: string,
      fields: arrayOf(
        shape({
          ...fieldProps,
          radioGroup: arrayOf(
            shape({
              disabled: bool,
              value: oneOfType([string, number]).isRequired,
              label: oneOfType([string, number]).isRequired,
              color: oneOf(['primary', 'secondary', 'default']).isRequired,
            }),
          ),
          span: shape({
            md: number.isRequired,
            sm: number.isRequired,
            xs: number.isRequired,
          }),
        }).isRequired,
      ).isRequired,
    }).isRequired,
  ).isRequired,
  submitColor: oneOf(['default', 'primary', 'secondary']),
  submitLabel: string,
  showSubmitBtn: bool,
  columns: number,
  spacing: number,
  reset: bool,
  onReset: func,
  resetLabel: string,
  isResetting: bool,
  termsOfServices: shape({
    ...fieldProps,
  }),
  readOnly: bool,
};

const defaultProps = {
  submitColor: 'primary',
  submitLabel: 'Submit',
  showSubmitBtn: true,
  columns: 1,
  spacing: 0,
  reset: false,
  onReset: null,
  resetLabel: 'Reset',
  isResetting: false,
  termsOfServices: null,
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
    case 'radio':
      element = <Radio {...props} />;
      break;
    default:
      element = <TextField {...props} />;
      break;
  }
  return element;
};

const getFields = blocks => blocks.reduce((acc, block) => {
  const { fields } = block;

  return acc.concat(fields.map(field => field));
}, []);

const Form = ({
  classes,
  spacing,
  fields,
  onSubmit,
  submitColor,
  submitLabel,
  columns,
  reset,
  onReset,
  resetLabel,
  isResetting,
  termsOfServices,
  showSubmitBtn,
  readOnly,
}) => {
  const allFields = getFields(fields);

  if (termsOfServices) {
    allFields.push(termsOfServices);
    if (readOnly) {
      Object.assign(termsOfServices, { disabled: true });
    }
  }

  const initialValues = getFormInitialValues(allFields);
  const validations = getFormValidations(allFields);
  const maxSize = 12;
  const btnBlock = columns === 1;
  const minSize = maxSize / columns;

  const fieldList = fields;
  if (readOnly) {
    fieldList.forEach((block) => {
      block.fields.forEach(field => Object.assign(field, { disabled: true }));
    });
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
        handleSubmit, isSubmitting, handleReset, values, ...props
      }) => (
        <form autoComplete="off" onSubmit={handleSubmit} noValidate>
          {fieldList.map(
            (block, key) => block.show !== false && (
            <Paper className={classes.paper} key={key.toString()}>
              <Typography className={classes.title} variant="h5" component="h3">
                {block.title}
              </Typography>
              <Grid spacing={spacing} container>
                {block.component && block.component}
                {block.fields
                      && block.fields.map(
                        field => field.show !== false && (
                        <Grid
                          xs={maxSize + (field.span ? field.span.xs : 0)}
                          sm={minSize + (field.span ? field.span.sm : 0)}
                          md={minSize + (field.span ? field.span.md : 0)}
                          key={field.id}
                          item
                        >
                          <div className={classes.wrapper}>
                            {field.type !== 'arrayField' ? (
                              renderField({
                                field,
                                values,
                                ...props,
                              })
                            ) : (
                              <FieldArray
                                name={field.name}
                                    // eslint-disable-next-line max-len
                                render={arrayHelpers => field.render({ values, arrayHelpers, ...props })
                                    }
                              />
                            )}
                          </div>
                        </Grid>
                        ),
                      )}
              </Grid>
            </Paper>
            ),
          )}
          <Grid
            justify={termsOfServices ? 'space-between' : 'flex-end'}
            alignItems="center"
            xs={maxSize}
            container
            item
          >
            {termsOfServices && termsOfServices.show !== false && (
            <CheckBox
              className={classes.checkBoxReset}
              field={termsOfServices}
              values={values}
              {...props}
              disabled={readOnly}
            />
            )}

            {reset && !readOnly && (
            <Button
              className={classes.reset}
              type="button"
              color="default"
              disabled={isResetting}
              onClick={handleReset}
            >
              {resetLabel}
            </Button>
            )}

            {submitLabel && showSubmitBtn !== false && !readOnly && (
            <Button
              className={btnBlock ? classes.wrapper : classes.noMargin}
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
        </form>
      )}
    />
  );
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
export default withStyles(styles, { withTheme: true })(Form);
