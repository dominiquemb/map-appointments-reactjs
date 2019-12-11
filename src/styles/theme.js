export default {
  spacing: 16,
  palette: {
    primary: {
      dark: '#211023',
      main: '#442146',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#78c2e1',
      main: '#217395',
      contrastText: '#FFFFFF',
    },
    textPrimary: {
      main: '#333333',
    },
    textSecondary: {
      main: '#757575',
    },
    success: {
      main: '#46C93A',
      dark: '#37A02E',
    },
    warning: {
      main: '#FFBA00',
      dark: '#E2A500',
    },
    info: {
      main: '#0089FF',
      dark: '#006DCB',
    },
    danger: {
      main: '#FF4757',
      dark: '#982A33',
    },
  },
  drawer: {
    width: 240,
    bgColor: '#FFFFFF',
  },
  typography: {
    useNextVariants: true,
    headline: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#248596',
        },
      },
    },
    MuiInput: {
      root: {
        '&$focused:after': {
          borderBottomColor: '#248596 !important',
        },
      },
    },
    MuiButton: {
      root: {
        fontSize: 14,
        fontWeight: 500,
        borderRadius: 3,
        color: '#757575',
        boxShadow: 'none !important',
        padding: '10px 30px',
        textTransform: 'uppercase',
        '&:disabled': {
          opacity: 0.4,
        },
      },
      text: {
        backgroundColor: 'transparent',
      },
      containedSecondary: {
        '&:disabled': {
          color: '#fff',
          backgroundColor: '#37A02E',
        },
      },
    },
    MuiCollapse: {
      entered: {
        overflow: 'visible',
        height: 'auto',
        '.overflowVisible > &': {
          overflow: 'visible',
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: 'transparent',
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'rgb(255, 255, 255)',
      },
    },
  },
};
