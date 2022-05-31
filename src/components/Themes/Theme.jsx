import { createTheme } from "@mui/material";
import { pink, purple } from "@mui/material/colors";

export const Theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: purple[500],
    },
    secondary: {
      main: pink[600],
    },
  },
});