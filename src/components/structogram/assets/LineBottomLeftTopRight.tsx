import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import { FC } from "react";

export const LineBottomLeftTopRight: FC<SvgIconProps> = (props) => {
  const { sx } = props;

  return (
    <SvgIcon
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        ...sx,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill="none"
        viewBox="0 0 5 5"
        strokeWidth="0.1"
      >
        <line
          x1="0"
          y1="5"
          x2="5"
          y2="0"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    </SvgIcon>
  );
};
