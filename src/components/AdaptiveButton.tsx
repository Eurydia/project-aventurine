import Button, { type ButtonProps } from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import type { FC, PropsWithChildren } from "react";

export const AdaptiveButton: FC<
  PropsWithChildren<
    ButtonProps & {
      collapsed: boolean;
    }
  >
> = (props) => {
  const { collapsed, ...rest } = props;

  if (collapsed) {
    return (
      <Tooltip title={rest.children}>
        <Button {...rest} startIcon={undefined} endIcon={undefined}>
          {rest.startIcon}
          {rest.endIcon}
        </Button>
      </Tooltip>
    );
  }

  return (
    <Button {...rest} startIcon={rest.startIcon} endIcon={rest.endIcon}>
      {rest.children}
    </Button>
  );
};
