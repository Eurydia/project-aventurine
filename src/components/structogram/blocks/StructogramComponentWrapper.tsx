import Box from "@mui/material/Box";
import { FC, PropsWithChildren } from "react";

export const StructogramComponentWrapper: FC<
  PropsWithChildren<{
    border?: {
      top?: boolean;
      bottom?: boolean;
      right?: boolean;
      left?: boolean;
    };
  }>
> = (props) => {
  return (
    <Box
      sx={{
        borderColor: "#000",
        borderStyle: "solid",
        borderLeftWidth: props.border?.left ? 2 : 0,
        borderTopWidth: props.border?.top ? 2 : 0,
        borderBottomWidth: props.border?.bottom ? 2 : 0,
        borderRightWidth: props.border?.right ? 2 : 0,
        width: "100%",
      }}
    >
      {props.children}
    </Box>
  );
};
