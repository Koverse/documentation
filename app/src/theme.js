import { deepOrange, red } from '@material-ui/core/colors'

export default {
  palette: {
    primary: {
      light: '#8caace',
      main: '#5d7b9d',
      dark: '#2f4f6f',
      contrastText: '#000000',
    },
    secondary: deepOrange,
    error: red,
  },
  app: {
    header: {
      height: 64,
    },
    navigationDrawer: {
      width: 240,
    },
  },
  typography: {
    useNextVariants: true,
  },
}
