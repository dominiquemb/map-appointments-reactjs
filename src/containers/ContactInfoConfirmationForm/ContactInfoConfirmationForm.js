import React, { Fragment, Component } from 'react';
import PropTypes, { oneOfType, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import {
  Grid,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';

import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

import Form from '../../components/Form/Form';
import withAuth from '../../context/withAuth';
import api from '../../services/api';


const styles = () => ({
  title: {
    marginBottom: '30px',
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
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

class ContactInfoConfirmationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      phone: '',
      email: '',
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const { auth, history } = this.props;

    try {
      const user = await auth.getUser();
      const phone = user.phoneNumbers.find(item => item.label.name.toLowerCase() === 'mobile');
      this.setState({
        user,
        email: user.email,
        phone: phone ? phone.number : '',
        phoneId: phone ? phone.id : null,
      });
    } catch (error) {
      auth.logout();
      history.push('/support');
    }

    this.setState({ loading: false });
  }

  showSnackbar = (variant, msg) => {
    const { enqueueSnackbar } = this.props;
    enqueueSnackbar(msg, { variant });
  }

  formFields = (t) => {
    const { phone, email } = this.state;
    return (
      [
        {
          id: 'email',
          name: 'email',
          label: t('login.email'),
          type: 'email',
          validateAs: 'email',
          requiredMessage: t('login.emailRequired'),
          defaultVal: email,
          required: true,
          customProps: {
            style: {
              marginBottom: '20px',
            },
          },
        },
        {
          id: 'phone',
          name: 'phone',
          label: t('login.phone'),
          type: 'phone',
          validateAs: 'text',
          requiredMessage: t('login.phoneRequired'),
          defaultVal: phone,
          required: true,
          customProps: {
            style: {
              marginBottom: '30px',
            },
          },
        },
      ]
    );
  };

  async handleSubmit(values, { resetForm }) {
    this.setState({ loading: true });
    const {
      user,
      phone,
      email,
      phoneId,
    } = this.state;
    const {
      t,
      history,
      enqueueSnackbar,
    } = this.props;

    try {
      if (values.phone === phone && values.email === email) {
        history.push('/');
      } else {
        if (values.phone !== phone) {
          await api.patient.addPhoneNumber({
            userId: user.id,
            phone: values.phone,
            phoneId,
          });
        }

        if (values.email !== email) {
          await api.patient.updateProfile({
            userId: user.id,
            email: values.email,
            last_name: user.lastName,
            first_name: user.firstName,
            date_of_birthday: user.dateOfBirthday,
          });
        }

        enqueueSnackbar(
          t('contact_info_confirmation.success'),
          { variant: 'success' },
        );
        history.push('/');
      }
    } catch (error) {
      enqueueSnackbar(
        t('contact_info_confirmation.error'),
        { variant: 'error' },
      );
    }

    resetForm();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { t, classes } = this.props;

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
            <Typography className={classes.title} variant="h6" gutterBottom>
              {t('contact_info_confirmation.title')}
            </Typography>
            <Form
              fields={this.formFields(t)}
              onSubmit={this.handleSubmit}
              submitLabel={t('contact_info_confirmation.submit')}
            />
          </Fragment>
        )
    );
  }
}

ContactInfoConfirmationForm.propTypes = propTypes;
const ContactInfoConfirmationFormStyled = withStyles(
  styles, { withTheme: true },
)(withAuth(withSnackbar(ContactInfoConfirmationForm)));
const ContactInfoConfirmationFormTranslated = withTranslation()(ContactInfoConfirmationFormStyled);
export default ContactInfoConfirmationFormTranslated;
