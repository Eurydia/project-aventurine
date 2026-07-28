import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { FC, PropsWithChildren } from "react";

export const WorkspacePanel: FC<
  PropsWithChildren<{
    ariaLabel: string;
    display: "flex" | "none";
    label: string;
    status: string;
  }>
> = (props) => {
  const { ariaLabel, children, display, label, status } = props;

  return (
    <Paper
      component="section"
      aria-label={ariaLabel}
      sx={(theme) => ({
        minWidth: 0,
        minHeight: 0,
        display,
        flexDirection: "column",
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "none",
      })}
    >
      <Box
        sx={(theme) => ({
          minHeight: theme.spacing(6),
          padding: theme.spacing(1.25, 2),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: theme.spacing(2),
          flexShrink: 0,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Typography component="h2" variant="overline">
          {label}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {status}
        </Typography>
      </Box>

      <Box
        sx={{
          minWidth: 0,
          minHeight: 0,
          flex: 1,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};
