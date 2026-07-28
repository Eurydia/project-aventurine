import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { alpha, type Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { type FC, type ReactNode, useCallback, useMemo, useState } from "react";
import { getPreviewState } from "~/core/sharing";
import { WorkspacePanel } from "./WorkspacePanel";
import { WorkspaceToolbar } from "./WorkspaceToolbar";

export const Layout: FC<{
  slotAppBar: ReactNode;
  slotPanelLeft: ReactNode;
  slotPanelRight: ReactNode;
}> = (props) => {
  const { slotAppBar, slotPanelLeft, slotPanelRight } = props;
  const [leftPanelOpen, setLeftPanelOpen] = useState(() =>
    getPreviewState(window.location.href),
  );
  const matchBreakpointXs = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md"),
  );

  const handleToggleCode = useCallback(() => {
    setLeftPanelOpen((previous) => !previous);
  }, []);

  const { showLeftPanel, showRightPanel, showSinglePanel, toggleCodeLabel } =
    useMemo(
      () =>
        ({
          showLeftPanel: !leftPanelOpen,
          showRightPanel: !matchBreakpointXs || leftPanelOpen,
          showSinglePanel: leftPanelOpen || matchBreakpointXs,
          toggleCodeLabel: leftPanelOpen ? "Show code" : "Hide code",
        }) as const,
      [leftPanelOpen, matchBreakpointXs],
    );

  return (
    <Box
      sx={(theme) => {
        const gridColor = alpha(theme.palette.primary.main, 0.155);
        const gridLineWidth = theme.spacing(0.125);

        return {
          height: "100dvh",
          padding: 4,
          backgroundColor: theme.palette.background.default,
          backgroundImage: [
            `linear-gradient(${gridColor} ${gridLineWidth}, transparent ${gridLineWidth})`,
            `linear-gradient(90deg, ${gridColor} ${gridLineWidth}, transparent ${gridLineWidth})`,
          ].join(", "),
          backgroundSize: [
            `${theme.spacing(8)} ${theme.spacing(8)}`,
            `${theme.spacing(8)} ${theme.spacing(8)}`,
          ].join(", "),
        };
      }}
    >
      <Stack
        spacing={4}
        sx={{
          height: "100%",
        }}
      >
        <WorkspaceToolbar
          actions={slotAppBar}
          onToggleCode={handleToggleCode}
          toggleCodeLabel={toggleCodeLabel}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={4}
            sx={{
              height: "100%",
            }}
          >
            <Grid
              hidden={!showLeftPanel}
              size={{
                xs: 12,
                md: showSinglePanel ? 12 : 6,
              }}
            >
              <WorkspacePanel label="Source code">
                {slotPanelLeft}
              </WorkspacePanel>
            </Grid>
            <Grid
              hidden={!showRightPanel}
              size={{
                xs: 12,
                md: showSinglePanel ? 12 : 6,
              }}
            >
              <WorkspacePanel label="Diagram output">
                {slotPanelRight}
              </WorkspacePanel>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};
