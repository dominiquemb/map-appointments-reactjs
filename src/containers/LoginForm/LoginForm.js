import React, { Fragment, Component } from 'react';
import PropTypes, { oneOfType, object } from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import {
  Grid,
  Radio,
  Button,
  Typography,
  RadioGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';

import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

import Form from '../../components/Form/Form';
import withAuth from '../../context/withAuth';
import api from '../../services/api';
import errorParse from '../../utils/errorParse';


const styles = theme => ({
  btn: {
    marginTop: '20px',
  },
  wrapper: {
    marginBottom: theme.palette.textPrimary.main,
  },
  languageSelector: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px',
  },
});

const propTypes = {
  t: PropTypes.func.isRequired,
  classes: oneOfType([object]).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      options: null,
      loading: false,
      codeAttempts: 0,
      loginAttempts: 0,
      selectedOption: null,
      submitOptionAttemps: 0,
      showConfirmation: false,
      confirmationCheckType: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitCode = this.handleSubmitCode.bind(this);
    this.renderOptionsForm = this.renderOptionsForm.bind(this);
    this.handleSubmitOption = this.handleSubmitOption.bind(this);
    this.handleChangeContact = this.handleChangeContact.bind(this);
    this.renderConfirmationCodeForm = this.renderConfirmationCodeForm.bind(this);
  }

  async componentWillMount() {
    const {
      t,
      auth,
      match,
      history,
    } = this.props;
    if (match.params.code && match.params.userId) {
      this.setState({ loading: true });

      try {
        const { data } = await api.auth.code(match.params);
        /* eslint-disable-next-line camelcase */
        const { token, user_id, options } = data;

        if (token) {
          await auth.loginWithToken(token);
          if (auth.isLoggedIn()) {
            history.push('/contact-info-confirmation');
          }
        /* eslint-disable-next-line camelcase */
        } else if (user_id && options) {
          this.setState({
            options,
            loading: false,
            userId: user_id,
            selectedOption: options[0].value,
          });
        } else {
          throw new Error();
        }
      } catch (error) {
        this.setState({ loading: false });
        this.showSnackbar('error', t('login.link.expired'));
        history.push('/login');
      }
    }
  }

  componentDidMount() {
    const { auth, history } = this.props;
    if (auth.isLoggedIn()) {
      history.push('/');
    }
  }

  showSnackbar = (variant, msg) => {
    const { enqueueSnackbar } = this.props;
    enqueueSnackbar(msg, { variant });
  }

  formFields = t => (
    [
      {
        id: 'firstname',
        name: 'firstname',
        label: t('login.firstname'),
        type: 'firstname',
        validateAs: 'text',
        requiredMessage: t('login.firstnameRequired'),
        defaultVal: '',
        required: true,
        customProps: {
          style: {
            marginBottom: '20px',
          },
        },
      },
      {
        id: 'lastname',
        name: 'lastname',
        label: t('login.lastname'),
        type: 'lastname',
        validateAs: 'text',
        requiredMessage: t('login.lastnameRequired'),
        defaultVal: '',
        required: true,
        customProps: {
          style: {
            marginBottom: '20px',
          },
        },
      },
      {
        id: 'dob',
        name: 'DateOfBirth',
        label: t('login.dob'),
        type: 'date',
        validateAs: 'date',
        requiredMessage: t('login.dobRequired'),
        defaultVal: null,
        required: true,
        customProps: {
          format: 'MM/DD/YYYY',
          variant: 'standard',
          disableFuture: true,
          disablePast: false,
          onlyCalendar: false,
          mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
          placeholder: 'MM/DD/YYYY',
          style: {
            marginBottom: '30px',
          },
        },
      },
    ]
  );

  handleChangeContact(e) {
    this.setState({ selectedOption: e.target.value });
  }

  async handleSubmitOption() {
    this.setState({ loading: true });

    let confirmationCheckType = null;
    const { history, enqueueSnackbar } = this.props;
    const { userId, selectedOption, submitOptionAttemps } = this.state;

    try {
      const { data } = await api.auth.option(userId, selectedOption);
      confirmationCheckType = data.check_type;
    } catch (error) {
      enqueueSnackbar(errorParse(error), { variant: 'error' });

      if (submitOptionAttemps > 4) {
        history.push('/support');
      }
    }

    this.setState({
      loading: false,
      confirmationCheckType,
      showConfirmation: !!confirmationCheckType,
      submitOptionAttemps: submitOptionAttemps + 1,
    });
  }

  async handleSubmit(values, { resetForm }) {
    this.setState({ loading: true });

    const {
      auth,
      history,
      enqueueSnackbar,
    } = this.props;
    const { loginAttempts } = this.state;

    try {
      /* eslint-disable-next-line camelcase */
      const { user_id, options } = await auth.getUserMFAOptions({
        ...values,
        dob: moment(values.DateOfBirth, 'YYYY-DD-MM').format().substr(0, 10),
      });

      this.setState({
        options,
        userId: user_id,
        selectedOption: options[0].value,
      });

      if (auth.isLoggedIn()) {
        history.push('/');
      }
    } catch (error) {
      enqueueSnackbar(
        'Invalid date of birth, email or phone.',
        { variant: 'warning' },
      );

      if (loginAttempts > 4) {
        history.push('/support');
      }
    }

    resetForm();
    this.setState({
      loading: false,
      loginAttempts: loginAttempts + 1,
    });
  }

  async handleSubmitCode({ code }, { resetForm }) {
    this.setState({ loading: true });

    const { userId, codeAttempts } = this.state;
    const {
      t,
      auth,
      history,
      enqueueSnackbar,
    } = this.props;

    try {
      const { data } = await api.auth.code({ userId, code });
      const { token } = data;

      await auth.loginWithToken(token);
      if (auth.isLoggedIn()) {
        history.push('/contact-info-confirmation');
      }
    } catch (error) {
      resetForm();
      enqueueSnackbar(t('error.not_valid_code'), { variant: 'warning' });

      if (codeAttempts > 4) {
        history.push('/support');
      }
    }

    this.setState({
      loading: false,
      codeAttempts: codeAttempts + 1,
    });
  }

  renderConfirmationCodeForm() {
    const { t } = this.props;
    const { confirmationCheckType } = this.state;

    return (
      <div>
        {(confirmationCheckType === 'code') ? (
          <React.Fragment>
            <Typography variant="h6">
              {t('login.confirmation.message')}
            </Typography>
            <Form
              fields={[{
                id: 'code',
                name: 'code',
                type: 'text',
                required: true,
                validateAs: 'text',
                label: t('login.confirmation.code'),
                customProps: {
                  style: { margin: '20px 0' },
                },
              }]}
              submitLabel={t('login.submit.code')}
              onSubmit={this.handleSubmitCode}
            />
          </React.Fragment>
        ) : (
          <Typography align="center" variant="subtitle1">
            {t('login.confirmation.link')}
          </Typography>
        )}
      </div>
    );
  }

  renderOptionsForm() {
    const { classes, t } = this.props;
    const { options } = this.state;

    const contact = t('login.contact');
    const submitText = t('login.submit');
    const loginlink = t('login.send.login.link');
    const optionsMessage = t('login.options.message');

    return (
      <FormControl fullWidth>
        <Typography>
          {optionsMessage}
        </Typography>
        <RadioGroup
          name="contact"
          aria-label={contact}
          defaultValue={options[0].value}
          onChange={this.handleChangeContact}
        >
          {options
            .map(option => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                label={option.label}
                control={<Radio color="primary" />}
              />
            ))}
        </RadioGroup>
        <FormHelperText>
          {loginlink}
        </FormHelperText>
        <Button
          color="primary"
          variant="contained"
          className={classes.btn}
          onClick={this.handleSubmitOption}
        >
          {submitText}
        </Button>
      </FormControl>
    );
  }

  render() {
    const {
      options,
      loading,
      showConfirmation,
    } = this.state;
    const { classes, t } = this.props;

    return (
      loading
        ? (
          <Grid align="center">
            <CircularProgress size={80} />
          </Grid>
        )
        : (
          <Fragment>
            <div className={classes.languageSelector}>
              <LanguageSelector small theme={{ palette: { type: 'dark' } }} selected="EN" />
            </div>
            {showConfirmation
              ? this.renderConfirmationCodeForm()
              : (
                <Fragment>
                  <Typography variant="h6" gutterBottom>
                    {options ? t('login.verification') : t('login.login')}
                  </Typography>
                  {options
                    ? this.renderOptionsForm()
                    : (
                      <Form
                        fields={this.formFields(t)}
                        submitLabel={t('login.submit')}
                        onSubmit={this.handleSubmit}
                      />
                    )}
                </Fragment>
              )}
          </Fragment>
        )
    );
  }
}

LoginForm.propTypes = propTypes;
const LoginFormStyled = withStyles(styles, { withTheme: true })(withAuth(withSnackbar(LoginForm)));
const LoginFormTranslated = withTranslation()(LoginFormStyled);
export default LoginFormTranslated;
