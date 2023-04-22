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
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          //   padding: "4px 4px",
        },
      },
    },
  },
});

export default defaultTheme;
