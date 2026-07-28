import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { type FC, Fragment } from "react";
import { LiveEditor } from "~/components/LiveEditor";
import { themeDark } from "./theme";

export const App: FC = () => {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={themeDark}>
        <SnackbarProvider
          preventDuplicate
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <LiveEditor />
        </SnackbarProvider>
      </ThemeProvider>
    </Fragment>
  );
};
