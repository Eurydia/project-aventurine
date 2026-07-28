import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";
import { StructogramProcess } from "./StructogramProcess";

export const StructogramLoopFirst: FC<
  PropsWithChildren<{
    condition: string | undefined;
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
      <StructogramComponentText>{props.condition}</StructogramComponentText>
      <Box sx={{ paddingLeft: 2 }}>
        {props.children !== undefined ? (
          props.children
        ) : (
          <StructogramProcess border={{ top: true, left: true }} />
        )}
      </Box>
    </StructogramComponentWrapper>
  );
};
