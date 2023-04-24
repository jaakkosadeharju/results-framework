import { Color, colors, createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: colors.teal[300],
    },
    secondary: {
      main: colors.orange[500],
    },
    background: {
      default: colors.blueGrey[700],
      paper: colors.blueGrey[900],
    },
    text: {
      disabled: colors.blueGrey[300],
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          color: colors.blueGrey[50],
          backgroundColor: colors.blueGrey[900],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: colors.blueGrey[200],
        },
        contained: {
          color: colors.blueGrey[900],
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: colors.blueGrey[50],
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: colors.blueGrey[50],
          borderColor: colors.blueGrey[300],
        },
        notchedOutline: {
          color: colors.blueGrey[50],
          borderColor: colors.teal[200],
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: colors.blueGrey[50],
          backgroundColor: colors.blueGrey[900],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: colors.blue[300],
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        standard: {
          color: colors.blueGrey[50],
        },
      },
    },
  },
});

export default defaultTheme;
function createColor(
  arg0: string
): import("@mui/material").PaletteColorOptions | undefined {
  throw new Error("Function not implemented.");
}
