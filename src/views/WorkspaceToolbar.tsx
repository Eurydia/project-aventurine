import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { FC, ReactNode } from "react";

export const WorkspaceToolbar: FC<{
  actions: ReactNode;
  onToggleCode: () => void;
  toggleCodeLabel: string;
}> = (props) => {
  const { actions, onToggleCode, toggleCodeLabel } = props;

  return (
    <Box
      component="header"
      sx={(theme) => ({
        minWidth: 0,
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto auto",
        alignItems: "center",
        columnGap: theme.spacing(2),
        rowGap: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "minmax(0, 1fr) auto",
          paddingBottom: theme.spacing(1.5),
        },
      })}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography component="h1" variant="overline" sx={{ lineHeight: 1.2 }}>
          Structogram
        </Typography>
        <Typography
          component="p"
          variant="caption"
          color="text.secondary"
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          })}
        >
          Visual code workbench
        </Typography>
      </Box>

      <Box
        component="nav"
        aria-label="Workspace controls"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            gridColumn: "1 / -1",
            gridRow: 2,
          },
        })}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={onToggleCode}
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          })}
        >
          {toggleCodeLabel}
        </Button>
      </Box>

      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "flex-end",
          [theme.breakpoints.down("sm")]: {
            gridColumn: 2,
            gridRow: 1,
          },
        })}
      >
        {actions}
      </Box>
    </Box>
  );
};
