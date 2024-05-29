import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#222C34",
    },
    secondary: {
      main: "#009CDB",
    },
    info: {
      main: "#70787A",
      light: "#757575",
    },
    error: {
      main: "#D94F37",
    },
    success: {
      main: "#00A758",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          boxSizing: "border-box",
        },
        "*, *::before, *::after": {
          boxSizing: "inherit",
        },
        "*": {
          margin: 0,
          padding: 0,
        },
        body: {
          height: "100%",
          minHeight: "100vh",
          fontSize: "16px",
        },
        "img, picture, video, canvas, svg": {
          display: "block",
          maxWidth: "100%",
        },
        " input, button, textarea, select": {
          font: "inherit",
        },
        "p, h1, h2, h3, h4, h5, h6": {
          overflowWrap: "break-word",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        lineHeight: "100%",
        fontFamily: "Open Sans, sans-serif",
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
