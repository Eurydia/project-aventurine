import { alpha, createTheme } from "@mui/material/styles";

const earth = {
  ink: "#3a2c22",
  canvas: "#eee5d6",
  paper: "#faf6ee",
  paperRaised: "#fffaf2",
  clay: "#8b5e3c",
  sage: "#71805d",
  parchment: "#fffaf0",
  text: "#3a2c22",
  textMuted: "#776858",
};

export const themeDark = createTheme({
  palette: {
    mode: "light",
    common: {
      black: "#241a14",
      white: earth.parchment,
    },
    primary: {
      main: earth.clay,
      light: "#b88360",
      dark: "#5f3d29",
      contrastText: earth.parchment,
    },
    secondary: {
      main: earth.sage,
      light: "#98a584",
      dark: "#4d593d",
      contrastText: earth.parchment,
    },
    background: {
      default: earth.canvas,
      paper: earth.paper,
    },
    text: {
      primary: earth.text,
      secondary: earth.textMuted,
    },
    divider: alpha(earth.ink, 0.14),
    action: {
      hover: alpha(earth.clay, 0.1),
      selected: alpha(earth.clay, 0.16),
      focus: alpha(earth.clay, 0.22),
    },
  },
  typography: {
    fontFamily: ["'Fira Code Variable'", "monospace"].join(","),
    button: {
      fontWeight: 650,
    },
    overline: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          colorScheme: "light",
        },
        body: {
          minHeight: "100vh",
          backgroundColor: earth.canvas,
          scrollbarColor: `${earth.clay} ${earth.canvas}`,
        },
        "#root": {
          minHeight: "100vh",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.spacing(1),
        }),
      },
      defaultProps: {
        disableElevation: true,
        disableTouchRipple: true,
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderWidth: theme.spacing(0.125),
          borderStyle: "solid",
          borderColor: alpha(earth.ink, 0.14),
          backgroundColor: earth.paperRaised,
          boxShadow: `0 ${theme.spacing(2.25)} ${theme.spacing(5.5)} ${alpha(earth.ink, 0.16)}`,
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          color: earth.parchment,
          borderWidth: theme.spacing(0.125),
          borderStyle: "solid",
          borderColor: alpha(earth.parchment, 0.12),
          backgroundColor: earth.ink,
        }),
      },
    },
  },
});
