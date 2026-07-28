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
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: ["'Fira Code Variable'", "monospace"].join(","),
    button: {
      fontWeight: 650,
      letterSpacing: "0.035em",
    },
    overline: {
      fontWeight: 700,
      letterSpacing: "0.12em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          colorScheme: "light",
        },
        body: {
          minWidth: 320,
          minHeight: "100vh",
          backgroundColor: earth.canvas,
          scrollbarColor: `${earth.clay} ${earth.canvas}`,
        },
        "#root": {
          minHeight: "100vh",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
      defaultProps: {
        disableElevation: true,
        disableTouchRipple: true,
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        grouped: {
          borderColor: alpha(earth.ink, 0.18),
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          border: `1px solid ${alpha(earth.ink, 0.14)}`,
          backgroundColor: earth.paperRaised,
          boxShadow: `0 18px 44px ${alpha(earth.ink, 0.16)}`,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: earth.parchment,
          border: `1px solid ${alpha(earth.parchment, 0.12)}`,
          backgroundColor: earth.ink,
        },
      },
    },
  },
});
