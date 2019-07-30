import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      contrastText: '#fff'
    },
    secondary: {
      main: '#673ab7',
      contrastText: '#fff'
    },
    accent: {
      main: '#ef5350',
      contrastText: '#fff'
    }
  }
});

export default theme;
