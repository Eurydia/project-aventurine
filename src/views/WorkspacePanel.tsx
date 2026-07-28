import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC, PropsWithChildren } from "react";

export const WorkspacePanel: FC<
  PropsWithChildren<{
    label: string;
  }>
> = (props) => {
  const { children, label } = props;

  return (
    <Paper
      variant="outlined"
      component="section"
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        borderWidth: theme.spacing(0.125),
        borderStyle: "solid",
        borderColor: theme.palette.divider,
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Stack
        sx={{
          height: "100%",
        }}
      >
        <Box
          sx={(theme) => ({
            padding: theme.spacing(1.25, 2),
          })}
        >
          <Typography component="h2" variant="overline">
            {label}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Stack>
    </Paper>
  );
};
