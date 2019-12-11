import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@material-ui/core';

import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  before: PropTypes.node,
  after: PropTypes.node,
  skipIntro: PropTypes.bool,
  skipBefore: PropTypes.bool,
  appointmentTypeText: PropTypes.string.isRequired,
  name: PropTypes.string,
};

const defaultProps = {
  before: null,
  after: null,
  skipIntro: false,
  skipBefore: false,
  name: '',
};

const styles = theme => ({
  contentContainer: {
    padding: '15px 30px',
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  },
});

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAfter: props.skipIntro && props.after !== null,
    };
    this.onShowAfter = this.onShowAfter.bind(this);
  }

  onShowAfter() {
    this.setState({ showAfter: true });
  }

  renderWelcomeMsg() {
    const {
      t,
      after,
      appointmentTypeText,
      name,
    } = this.props;

    return (
      <Fragment>
        <Typography align="center" display="block" variant="h5">
          {`${t('scheduler.welcome.hello')} ${name}`}
        </Typography>
        <Typography align="center" display="block" variant="h5">
          {t('scheduler.welcome.title')}
        </Typography>
        <br />
        <br />
        <Typography align="center" variant="subtitle1" paragraph display="block">
          {`${t('scheduler.welcome.subtitle1')} ${appointmentTypeText} ${t('scheduler.welcome.subtitle1b')}`}
        </Typography>
        <Typography align="center" variant="subtitle1" paragraph display="block">
          {`${t('scheduler.welcome.subtitle2')}${(after !== null) ? ':' : '.'}`}
        </Typography>
        {after !== null && (
          <div style={{ padding: '20px' }}>
            <Grid item xs={12} align="center">
              <Button size="large" variant="outlined" color="primary" onClick={this.onShowAfter}>
                {t('scheduler.welcome.continue')}
              </Button>
            </Grid>
          </div>
        )}
        <br />
        <Typography align="center" variant="subtitle1" paragraph display="block">
          {t('scheduler.welcome.subtitle3')}
        </Typography>
      </Fragment>
    );
  }

  render() {
    const { showAfter } = this.state;
    const {
      classes,
      before,
      after,
      skipIntro,
      skipBefore,
    } = this.props;

    let content = (skipIntro && showAfter) ? after : this.renderWelcomeMsg();
    if (!skipBefore) {
      content = before;
    }
    if (showAfter) {
      content = after;
    }
    return (
      <div className={classes.contentContainer}>
        {content}
      </div>
    );
  }
}


Intro.propTypes = propTypes;
Intro.defaultProps = defaultProps;
export default withTranslation()(withStyles(styles, { withTheme: true })(Intro));
