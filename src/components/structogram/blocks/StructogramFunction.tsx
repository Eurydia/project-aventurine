import Box from "@mui/material/Box";
import { FC, PropsWithChildren } from "react";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";
import { StructogramProcess } from "./StructogramProcess";

export const StructogramFunction: FC<
  PropsWithChildren<{
    declaration?: string;
    border?: Partial<{
      top: boolean;
      bottom: boolean;
      right: boolean;
      left: boolean;
    }>;
  }>
> = (props) => {
  return (
    <StructogramComponentWrapper border={props.border}>
      <StructogramComponentText align="center">
        {props.declaration}
      </StructogramComponentText>
      <Box sx={{ paddingX: 2 }}>
        {props.children === undefined ? (
          <StructogramProcess border={{ top: true, left: true, right: true }} />
        ) : (
          props.children
        )}
      </Box>
    </StructogramComponentWrapper>
  );
};
