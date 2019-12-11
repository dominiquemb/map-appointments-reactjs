import React, { Fragment } from 'react';
import {
  oneOf, oneOfType, object, func,
} from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import {
  ArrowDropDown, ArrowDropUp, Language, SwapVert,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import Storage from '../../services/storage';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: '#EAEAEA',
      '& $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  icon: {
    [theme.breakpoints.up('sm')]: {
      marginRight: 5,
    },
    // marginRight: 5,
  },
  rightIcon: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 2,
    },
    marginRight: '-20px',
  },
  btn: {
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    '&:hover': {
      color: '#EAEAEA',
      borderColor: '#EAEAEA',
    },
  },
  btnDark: {
    color: '#666666',
    borderColor: '#666666',
    '&:hover': {
      color: '#666666',
      borderColor: '#666666',
    },
  },
  popper: {
    zIndex: 999,
  },
});

const propTypes = {
  classes: oneOfType([object]).isRequired,
  selected: oneOf(['EN', 'ES']).isRequired,
  i18n: oneOfType([object]).isRequired,
  t: func.isRequired,
  theme: oneOfType([object]),
};

const defaultProps = {
  theme: { palette: { type: 'light' } },
};

const DEFAULT_LANG = [
  { value: 'EN', label: 'selector.english', short: 'EN' },
  { value: 'ES', label: 'selector.spanish', short: 'ES' },
];

class LanguageSelector extends React.Component {
  state = {
    open: false,
    selectedLang: null,
    languages: DEFAULT_LANG,
  };

  componentWillMount() {
    const { selected } = this.props;
    const localLang = Storage.getLocalItem('asms_lang');
    const lang = localLang ? localLang.toUpperCase() : selected;
    this.setSelected(lang);
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  setSelected = (value) => {
    const lang = DEFAULT_LANG.find(item => item.value === value);
    const result = DEFAULT_LANG.filter(item => item.value !== value);
    this.setState({
      selectedLang: lang,
      languages: result,
      open: false,
    });
  };

  handleChange = async (value) => {
    const { i18n } = this.props;
    this.setSelected(value);
    await i18n.changeLanguage(value.toLowerCase());
    Storage.setLocalItem('asms_lang', value.toLowerCase());
  };

  render() {
    const { classes, t, theme } = this.props;
    const themeType = theme.palette.type;
    const {
      open, selectedLang, languages,
    } = this.state;
    const arrow = open ? (
      <ArrowDropUp className={classes.rightIcon} />
    ) : (
      <ArrowDropDown className={classes.rightIcon} />
    );
    return (
      <Fragment>
        <Button
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
          size="large"
          variant="outlined"
          color="primary"
          className={(themeType === 'dark') ? classes.btnDark : classes.btn}
        >
          <Hidden xsDown>
            <Language className={classes.icon} />
            {t(selectedLang.label)}
          </Hidden>
          <Hidden smUp>
            <Language className={classes.icon} />
          </Hidden>
          {arrow}
        </Button>
        <Popper
          open={open}
          className={classes.popper}
          anchorEl={this.anchorEl}
          transition
          placement="bottom-end"
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom-end' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    {languages.map(item => (
                      <MenuItem
                        key={item.value}
                        className={classes.menuItem}
                        onClick={() => {
                          this.handleChange(item.value);
                        }}
                      >
                        <ListItemIcon>
                          <SwapVert color="action" />
                        </ListItemIcon>
                        <ListItemText
                          inset
                          primary={t(item.label)}
                        />
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Fragment>
    );
  }
}

LanguageSelector.propTypes = propTypes;
LanguageSelector.defaultProps = defaultProps;
const LanguageSelectorStyled = withStyles(styles, { withTheme: true })(LanguageSelector);
const LangSelectorTranslated = withTranslation()(LanguageSelectorStyled);
export default LangSelectorTranslated;
