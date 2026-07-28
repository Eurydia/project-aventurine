import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type StructogramComponentWrapperProps = {
	children: ReactNode;
	borderTop?: boolean;
	borderBottom?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
};
export const StructogramComponentWrapper: FC<
	StructogramComponentWrapperProps
> = (props) => {
	const {
		children,
		borderTop,
		borderBottom,
		borderLeft,
		borderRight,
	} = props;

	const borderLeftWidth = borderLeft ? 2 : 0;
	const borderTopWidth = borderTop ? 2 : 0;
	const borderBottomWidth = borderBottom ? 2 : 0;
	const borderRightWidth = borderRight ? 2 : 0;

	return (
		<Box
			width="100%"
			sx={{
				borderStyle: "solid",
				borderLeftWidth,
				borderTopWidth,
				borderBottomWidth,
				borderRightWidth,
			}}
		>
			{children}
		</Box>
	);
};
