import React, { Component } from 'react';
import {
  shape, string, bool, oneOfType, func, object,
} from 'prop-types';
import {
  CloudUpload, Clear, VerticalAlignBottom, InsertDriveFile,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, Typography } from '@material-ui/core';

import storage from '../../services/storage';
import config from '../../config';

const styles = () => ({
  resetBtn: {
    background: 'none',
    border: 'none',
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: 15,
    color: '#248596',
    fontWeight: 500,
  },
  icon: {
    fontSize: 60,
    color: '#d9d9d9',
  },
  inputFile: {
    display: 'none',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dataContainer: {
    width: '100%',
    borderRadius: 5,
    border: '1px solid rgba(0, 0, 0, 0.20)',
  },
  labelContainer: {
    width: '85%',
    cursor: 'pointer',
    borderRadius: '10px',
    border: '2px dashed rgba(0, 0, 0, 0.20)',
  },
  uploadContainer: {
    height: '63px',
  },
  uploadLabelValidation: {
    position: 'absolute',
    bottom: -16,
    left: 3,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    '& button svg': {
      fontSize: 26,
    },
    '&:first-child ': {
      width: '65%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',

      '& svg': {
        marginRight: 5,
        color: '#4d79ff',
      },
      '& p': {
        fontSize: 14,
        wordBreak: 'break-all',
      },
    },
    '&:last-child': {
      '& button': {
        '& svg': {
          cursor: 'pointer',
          color: '#ff0000',
        },
      },
      '& a': {
        color: '#808080',
        marginRight: 5,
      },
    },
  },
});

class UploadField extends Component {
  static propTypes = {
    field: shape({
      name: string.isRequired,
      label: string.isRequired,
      required: bool.isRequired,
      disabled: bool,
      customProps: oneOfType([object]),
    }).isRequired,
    touched: oneOfType([object]).isRequired,
    errors: oneOfType([object]).isRequired,
    setFieldValue: func.isRequired,
    classes: oneOfType([object]).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      fileData: null,
    };
  }

  componentWillMount() {
    const { field } = this.props;

    if (field.customProps) {
      const { defaultFile = null } = field.customProps;

      this.setState({ fileData: defaultFile });
    }
  }

  handleChange = (e) => {
    const { setFieldValue, field } = this.props;
    const fileData = e.currentTarget.files[0];

    this.setState({ fileData }, setFieldValue(field.name, fileData));
  };

  handleRemove = () => {
    const { setFieldValue, field } = this.props;

    this.setState({ fileData: null }, setFieldValue(field.name, null));
  };

  render() {
    const { fileData } = this.state;
    const {
      field, touched, errors, classes,
    } = this.props;
    const token = storage.getItem('token');

    return (
      <FormControl
        error={Boolean(touched[field.name] && errors[field.name])}
        className={classes.uploadContainer}
        fullWidth
      >
        {fileData && fileData.name ? (
          <div className={`${classes.mainContainer} ${classes.dataContainer}`}>
            <div className={classes.content}>
              <InsertDriveFile />
              <Typography variant="body2">{fileData.name}</Typography>
            </div>
            <div className={classes.content}>
              {fileData.url && (
                <a
                  href={`${config.api.baseURL}/${field.customProps.model}${
                    fileData.url
                  }/?token=${token}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.resetBtn}
                >
                  <VerticalAlignBottom />
                </a>
              )}
              {!field.disabled && (
                <button type="button" className={classes.resetBtn} onClick={this.handleRemove}>
                  <Clear />
                </button>
              )}
            </div>
          </div>
        ) : (
          <label
            htmlFor={field.name}
            className={`${classes.mainContainer} ${classes.labelContainer}`}
          >
            <input
              type="file"
              id={field.name}
              name={field.name}
              onChange={e => this.handleChange(e)}
              accept={field.customProps.accept || ''}
              className={classes.inputFile}
            />
            <CloudUpload className={classes.icon} />
            <Typography className={classes.title} variant="caption">
              BROWSE
            </Typography>
          </label>
        )}

        {touched[field.name] && errors[field.name] && (
          <FormHelperText
            classes={{
              root: classes.uploadLabelValidation,
            }}
            error
          >
            {errors[field.name]}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

export default withStyles(styles, { withTheme: true })(UploadField);
