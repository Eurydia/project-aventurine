import { Box, Stack } from "@mui/material";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { LineBottomLeftTopRight } from "../assets/LineBottomLeftTopRight";
import { LineTopLeftBottomRight } from "../assets/LineTopLeftBottomRight";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";
import { StructogramProcess } from "./StructogramProcess";

export const StructogramBinaryBranch: FC<{
  condition?: string;
  childrenIf: ReactNode;
  childrenElse: ReactNode;

  border?: Partial<{
    top: boolean;
    bottom: boolean;
    right: boolean;
    left: boolean;
  }>;
}> = (props) => {
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

  return (
    <StructogramComponentWrapper {...props.border}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <StructogramComponentText sx={{ textAlign: "center" }}>
          {props.condition}
        </StructogramComponentText>
        <Stack>
          <Box
            sx={{
              width: ifBlockWidth,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <StructogramComponentText
              shadow
              sx={{
                wordBreak: "keep-all",
                zIndex: 2,
              }}
            >
              True
            </StructogramComponentText>
            <LineTopLeftBottomRight htmlColor="black" />
          </Box>
          <Box
            sx={{
              width: ifBlockWidth,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              flexGrow: 1,
            }}
          >
            <LineBottomLeftTopRight />
            <StructogramComponentText
              shadow
              sx={{
                wordBreak: "keep-all",
                zIndex: 2,
              }}
            >
              False
            </StructogramComponentText>
          </Box>
        </Stack>
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            ref={ifBlockRef}
            component={Box}
            sx={{
              borderColor: "inherit",
              borderRightStyle: "solid",
              borderRightWidth: 2,
              minWidth: "20%",
              minHeight: "100%",
              flexGrow: 1,
              flexShrink: 1,
            }}
          >
            {props.childrenIf === undefined ? (
              <StructogramProcess border={{ top: true }} />
            ) : (
              props.childrenIf
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderColor: "inherit",
              borderRightStyle: "solid",
              borderRightWidth: 2,
              minWidth: "20%",
              minHeight: "100%",
              flexGrow: 1,
              flexShrink: 1,
            }}
          >
            {props.childrenElse === undefined ? (
              <StructogramProcess border={{ top: true }} />
            ) : (
              props.childrenElse
            )}
          </Box>
        </Box>
      </Box>
    </StructogramComponentWrapper>
  );
};
