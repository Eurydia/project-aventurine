import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";
import Latex from "react-latex-next";

export const StructogramComponentText: FC<
  Exclude<TypographyProps, "children"> & { children?: string; shadow?: boolean }
> = (props) => {
  return (
    <Typography
      {...props}
      sx={{
        wordBreak: "break-word",
        fontVariantLigatures: "contextual",
        padding: 1.5,
        textShadow: props.shadow
          ? `#fff 3px 0px 0px, #fff 2.83487px 0.981584px 0px, #fff 2.35766px 1.85511px 0px, #fff 1.62091px 2.52441px 0px, #fff 0.705713px 2.91581px 0px, #fff -0.287171px 2.98622px 0px, #fff -1.24844px 2.72789px 0px, #fff -2.07227px 2.16926px 0px, #fff -2.66798px 1.37182px 0px, #fff -2.96998px 0.42336px 0px, #fff -2.94502px -0.571704px 0px, #fff -2.59586px -1.50383px 0px, #fff -1.96093px -2.27041px 0px, #fff -1.11013px -2.78704px 0px, #fff -0.137119px -2.99686px 0px, #fff 0.850987px -2.87677px 0px, #fff 1.74541px -2.43999px 0px, #fff 2.44769px -1.73459px 0px, #fff 2.88051px -0.838247px 0px`
          : undefined,
        ...props.sx,
      }}
    >
      {props.children === undefined || props.children.length === 0 ? (
        "-"
      ) : (
        <Latex
          delimiters={[
            {
              left: "$",
              right: "$",
              display: false,
            },
          ]}
        >
          {props.children}
        </Latex>
      )}
    </Typography>
  );
};
