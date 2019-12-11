import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  input: {
    display: 'flex',
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  noOptionsMessage: {
    fontSize: 16,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
    bottom: 5,
    color: 'rgba(0, 0, 0, 0.54)',
  },
});

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  loadOptions: PropTypes.func.isRequired,
  defaultVal: PropTypes.oneOfType([PropTypes.object]),
  defaultOptions: PropTypes.arrayOf(PropTypes.object),
  clearCalendar: PropTypes.bool,
  clearCustomer: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  clearMedication: PropTypes.bool,
  clearPrescriber: PropTypes.bool,
  defaultInputValue: PropTypes.string,
  clearPrescription: PropTypes.bool,
  clearLoggedUser: PropTypes.bool,
  clearAffectedUser: PropTypes.bool,
  clearSpecie: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
  defaultVal: null,
  clearSpecie: false,
  defaultOptions: null,
  clearCustomer: false,
  clearCalendar: false,
  placeholder: 'Search',
  defaultInputValue: '',
  clearMedication: false,
  clearPrescriber: false,
  clearLoggedUser: false,
  clearPrescription: false,
  clearAffectedUser: false,
};

/* eslint-disable react/prop-types */
function NoOptionsMessage(props) {
  const { selectProps, innerProps } = props;
  const { inputValue } = selectProps;

  return (
    <Typography
      {...innerProps}
      className={selectProps.classes.noOptionsMessage}
    >
      {inputValue
        ? (
          <span>
            There are no results for
            <strong>{` '${inputValue}'`}</strong>
          </span>
        ) : 'Start typing…'}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const {
    selectProps, innerProps, children, innerRef,
  } = props;
  return (
    <TextField
      fullWidth
      variant="outlined"
      InputProps={{
        inputComponent,
        inputProps: {
          className: selectProps.classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
    />
  );
}

function Option(props) {
  const {
    isFocused, innerProps, children, innerRef, isSelected,
  } = props;
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}

function Placeholder(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Typography className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

function SingleValue(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Typography className={selectProps.classes.singleValue} {...innerProps}>
      {children}
    </Typography>
  );
}

function ValueContainer(props) {
  const { selectProps, children } = props;
  return <div className={selectProps.classes.valueContainer}>{children}</div>;
}
/* eslint-enable react/prop-types */

const components = {
  Option,
  Control,
  Placeholder,
  SingleValue,
  ValueContainer,
  NoOptionsMessage,
};

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: props.defaultVal };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(option) {
    const {
      onChange,
      handleClear,
      clearSpecie,
      clearCalendar,
      clearCustomer,
      clearMedication,
      clearLoggedUser,
      clearPrescriber,
      clearPrescription,
      clearAffectedUser,
    } = this.props;

    if (option && option.value) {
      this.setState({
        selected: option,
      }, () => onChange(option.value),
      clearCalendar && handleClear({ clearCalendar: false }),
      clearCustomer && handleClear({ clearCustomer: false }),
      clearMedication && handleClear({ clearMedication: false }),
      clearPrescriber && handleClear({ clearPrescriber: false }),
      clearPrescription && handleClear({ clearPrescription: false }),
      clearLoggedUser && handleClear({ clearLoggedUser: false }),
      clearAffectedUser && handleClear({ clearAffectedUser: false }),
      clearSpecie && handleClear({ clearSpecie: false }));
    } else {
      this.setState({
        selected: null,
      }, () => onChange(''));
    }
  }

  render() {
    const {
      classes,
      disabled,
      loadOptions,
      placeholder,
      defaultOptions,
      defaultInputValue,
      clearSpecie,
      clearCustomer,
      clearCalendar,
      clearLoggedUser,
      clearMedication,
      clearPrescriber,
      clearPrescription,
      clearAffectedUser,
    } = this.props;

    const { selected } = this.state;

    let value = selected;

    if (
      clearCalendar
      || clearCustomer
      || clearMedication
      || clearPrescriber
      || clearPrescription
      || clearLoggedUser
      || clearAffectedUser
      || clearSpecie
    ) {
      value = null;
    }

    return (
      <div style={{ zIndex: 2 }}>
        <AsyncSelect
          value={value}
          classes={classes}
          isDisabled={disabled}
          components={components}
          loadOptions={loadOptions}
          placeholder={placeholder}
          onBlurResetsInput={false}
          onChange={this.handleChange}
          defaultOptions={defaultOptions}
          defaultInputValue={defaultInputValue}
        />
      </div>
    );
  }
}

Autocomplete.propTypes = propTypes;
Autocomplete.defaultProps = defaultProps;
export default withStyles(styles)(Autocomplete);
