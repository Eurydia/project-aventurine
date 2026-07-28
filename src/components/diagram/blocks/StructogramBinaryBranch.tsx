import { Box } from "@mui/material";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { LineBottomLeftTopRight } from "../assets/LineBottomLeftTopRight";
import { LineTopLeftBottomRight } from "../assets/LineTopLeftBottomRight";
import { TEXT_SHADOW } from "../constants";
import { StructogramComponentText } from "./components/StructogramComponentText";
import { StructogramComponentWrapper } from "./components/StructogramComponentWrapper";
import { StructogramProcess } from "./StructogramProcess";

type StructogramBinaryBranchProps = {
  condition?: string;
  childrenIf: ReactNode;
  childrenElse: ReactNode;

  borderTop?: boolean;
  borderBottom?: boolean;
  borderRight?: boolean;
  borderLeft?: boolean;
};
export const StructogramBinaryBranch: FC<StructogramBinaryBranchProps> = (
  props,
) => {
  const { condition, childrenIf, childrenElse, ...rest } = props;

  const ifBlockRef = useRef<HTMLDivElement | null>(null);
  const [ifBlockWidth, setIfLabelWidth] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!ifBlockRef || !ifBlockRef.current) {
      return;
    }
    const ifWidth = ifBlockRef.current.getBoundingClientRect().width;
    setIfLabelWidth(`${ifWidth}px`);
  }, [ifBlockRef.current?.getBoundingClientRect()]);

  let bodyIf: ReactNode = <StructogramProcess borderTop />;
  if (childrenIf !== undefined) {
    bodyIf = childrenIf;
  }

  let bodyElse: ReactNode = <StructogramProcess borderTop />;
  if (childrenElse !== undefined) {
    bodyElse = childrenElse;
  }

  return (
    <StructogramComponentWrapper {...rest}>
      <Box width="100%" height="100%" display="flex" flexDirection="column">
        <StructogramComponentText align="center">
          {condition}
        </StructogramComponentText>
        <Box display="flex" flexDirection="row">
          <Box
            width={ifBlockWidth}
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <StructogramComponentText
              sx={{
                wordBreak: "keep-all",
                zIndex: 2,
                textShadow: TEXT_SHADOW,
              }}
            >
              True
            </StructogramComponentText>
            <LineTopLeftBottomRight htmlColor="black" />
          </Box>
          <Box
            flexGrow={1}
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <LineBottomLeftTopRight />
            <StructogramComponentText
              sx={{
                wordBreak: "keep-all",
                zIndex: 2,
                textShadow: TEXT_SHADOW,
              }}
            >
              False
            </StructogramComponentText>
          </Box>
        </Box>
        <Box
          width="100%"
          maxWidth="100%"
          height="100%"
          display="flex"
          flexDirection="row"
        >
          <Box
            ref={ifBlockRef}
            component={Box}
            flexGrow={1}
            flexShrink={1}
            minWidth="20%"
            minHeight="100%"
            sx={{
              borderColor: "inherit",
              borderRightStyle: "solid",
              borderRightWidth: 2,
            }}
          >
            {bodyIf}
          </Box>
          <Box
            display="flex"
            flexGrow={1}
            flexShrink={1}
            flexDirection="column"
            minWidth="20%"
            minHeight="100%"
          >
            {bodyElse}
          </Box>
        </Box>
      </Box>
    </StructogramComponentWrapper>
  );
};
