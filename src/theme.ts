import { colors, createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: colors.blue[700],
    },
    secondary: {
      main: colors.orange[500],
    },
  },
});

export default defaultTheme;
