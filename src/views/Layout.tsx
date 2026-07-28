import Box from "@mui/material/Box";
import { alpha, type Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { type FC, type ReactNode, useState } from "react";
import { getPreviewState } from "~/core/sharing";
import { WorkspacePanel } from "./WorkspacePanel";
import { WorkspaceToolbar } from "./WorkspaceToolbar";

/**
 * Defines the responsive workbench around the editor and diagram output.
 * The provided editor and output slots are treated as opaque content.
 */
export const Layout: FC<{
  slotAppBar: ReactNode;
  slotPanelLeft: ReactNode;
  slotPanelRight: ReactNode;
}> = (props) => {
  const { slotAppBar, slotPanelLeft, slotPanelRight } = props;
  const [leftPanelOpen, setLeftPanelOpen] = useState(
    getPreviewState(window.location.href),
  );
  const matchBreakpointXs = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md"),
  );

  const showSinglePanel = leftPanelOpen || matchBreakpointXs;
  const rightPanelDisplay =
    matchBreakpointXs && !leftPanelOpen ? "none" : "flex";
  const leftPanelDisplay = leftPanelOpen ? "none" : "flex";

  return (
    <Box
      sx={(theme) => {
        const gridColor = alpha(theme.palette.primary.main, 0.055);

        return {
          height: "100dvh",
          minHeight: 0,
          display: "grid",
          gridTemplateRows: "auto minmax(0, 1fr)",
          gap: "clamp(20px, 2.4vw, 36px)",
          padding: "clamp(20px, 3vw, 48px)",
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,
          backgroundImage: [
            `linear-gradient(${gridColor} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: [
            `${theme.spacing(4)} ${theme.spacing(4)}`,
            `${theme.spacing(4)} ${theme.spacing(4)}`,
          ].join(", "),
          [theme.breakpoints.down("sm")]: {
            gap: theme.spacing(2),
            padding: theme.spacing(2),
          },
        };
      }}
    >
      <WorkspaceToolbar
        actions={slotAppBar}
        onToggleCode={() => setLeftPanelOpen((previous) => !previous)}
        toggleCodeLabel={leftPanelOpen ? "Show code" : "Hide code"}
      />

      <Box
        component="main"
        sx={(theme) => ({
          minWidth: 0,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: showSinglePanel
            ? "minmax(0, 1fr)"
            : "repeat(2, minmax(0, 1fr))",
          gap: "clamp(20px, 2.4vw, 36px)",
          [theme.breakpoints.down("sm")]: {
            gap: theme.spacing(2),
          },
        })}
      >
        <WorkspacePanel
          ariaLabel="Code editor panel"
          display={leftPanelDisplay}
          label="Code panel"
          status="Input"
        >
          {slotPanelLeft}
        </WorkspacePanel>

        <WorkspacePanel
          ariaLabel="Diagram output panel"
          display={rightPanelDisplay}
          label="Diagram output"
          status="Live preview"
        >
          {slotPanelRight}
        </WorkspacePanel>
      </Box>
    </Box>
  );
};
