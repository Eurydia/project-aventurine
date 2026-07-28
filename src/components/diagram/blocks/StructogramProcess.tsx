import { FC } from "react";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";

export const StructogramProcess: FC<{
  children?: string;
  border?: Partial<{
    top: boolean;
    bottom: boolean;
    right: boolean;
    left: boolean;
  }>;
}> = (props) => {
  return (
    <StructogramComponentWrapper border={props.border}>
      <StructogramComponentText>{props.children}</StructogramComponentText>
    </StructogramComponentWrapper>
  );
};
