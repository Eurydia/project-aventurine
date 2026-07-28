import { FC } from "react";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";

export const StructogramError: FC<{
  context: string;
  reason: string;
  lineNumber: number;
  charNumber: number;
  caretOffset: number;
  border?: Partial<{
    top: boolean;
    bottom: boolean;
    right: boolean;
    left: boolean;
  }>;
}> = (props) => {
  const errorText = `At line ${props.lineNumber}, character ${props.charNumber}: ${props.reason}`;
  const caretText = "~".repeat(props.caretOffset) + "^";

  return (
    <StructogramComponentWrapper border={props.border}>
      <StructogramComponentText>{errorText}</StructogramComponentText>
      <StructogramComponentText sx={{ paddingY: 0 }}>
        {props.context}
      </StructogramComponentText>
      <StructogramComponentText sx={{ paddingY: 0 }}>
        {caretText}
      </StructogramComponentText>
    </StructogramComponentWrapper>
  );
};
