import { createTheme} from '@mui/material/styles';
import {red, green, grey} from '@mui/material/colors';

const Theme = createTheme({
    palette: {
      secondary: {
        main: grey[300],
      },
      button: {
        success: {
            main: green[500],
            dark: green[700],
        },
        danger: {
            main: red[500],
            dark: red[700],
        }
      }
    },
});

export default Theme;