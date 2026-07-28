import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC, ReactNode } from "react";

export const WorkspaceToolbar: FC<{
  actions: ReactNode;
  onToggleCode: () => void;
  toggleCodeLabel: string;
}> = (props) => {
  const { actions, onToggleCode, toggleCodeLabel } = props;

  return (
    <Box component="header">
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <Grid size="grow">
          <Stack spacing={1}>
            <Typography
              component="h1"
              variant="overline"
              sx={{ lineHeight: 1.2 }}
            >
              {`Online Structogram Builder`}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {`Beautiful structograms from code.`}
            </Typography>
          </Stack>
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: "auto",
          }}
        >
          <Stack
            spacing={2}
            direction={"row"}
            sx={{ justifyContent: { xs: "space-between", sm: "flex-start" } }}
          >
            <Button variant="outlined" onClick={onToggleCode}>
              {toggleCodeLabel}
            </Button>
            {actions}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
