import Box from "@mui/material/Box";
import { FC, PropsWithChildren } from "react";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";
import { StructogramProcess } from "./StructogramProcess";

export const StructogramLoopLast: FC<
  PropsWithChildren<{
    condition?: string;
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
      <Box sx={{ paddingLeft: 2 }}>
        {props.children === undefined ? (
          <StructogramProcess border={{ top: true, left: true }} />
        ) : (
          props.children
        )}
      </Box>
      <StructogramComponentText>{props.condition}</StructogramComponentText>
    </StructogramComponentWrapper>
  );
};
