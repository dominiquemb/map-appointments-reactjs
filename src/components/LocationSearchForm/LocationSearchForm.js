import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form/Form';

const propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  showDownload: PropTypes.bool,
  onDownload: PropTypes.func,
  downloadEnabled: PropTypes.bool,
};

const defaultProps = {
  onReset: () => {},
  showDownload: false,
  onDownload: null,
  downloadEnabled: false,
};

const LocationSearchForm = ({
  fields, onSubmit, onReset, showDownload, onDownload, downloadEnabled,
}) => (
  <Form
    fields={fields}
    hideButtons
    onSubmit={async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    }}
    onReset={async (values, { setSubmitting, resetForm }) => {
      const resetValues = {};
      Object.keys(values).map((prop) => {
        resetValues[prop] = '';
        return resetValues;
      });
      resetForm(resetValues);
      try {
        await onReset();
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    }}
    columns={12}
    spacing={24}
    showDownload={showDownload}
    onDownload={values => onDownload(values)}
    downloadEnabled={downloadEnabled}
  />
);

LocationSearchForm.propTypes = propTypes;
LocationSearchForm.defaultProps = defaultProps;

export default LocationSearchForm;
