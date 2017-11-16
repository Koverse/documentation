import { createMuiTheme } from 'material-ui/styles'
import { deepOrange, cyan, red } from 'material-ui/colors'

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: deepOrange,
    secondary: cyan,
    error: red,
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: deepOrange,
    secondary: cyan,
    error: red,
  },
})

export default theme
