import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, teal } from '@material-ui/core/colors';

const lite = '#f1f1f1';
const dark = '#111111';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: deepPurple.A400, // #651fff
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: teal,
    common: {
      white: lite,
      black: dark,
    },
    // error: will use the default color
  },
});

export default theme;
