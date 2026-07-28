import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";
import { StructogramProcess } from "./StructogramProcess";

type StructogramLoopLastProps = {
	condition?: string;
	children: ReactNode;

	borderTop?: boolean;
	borderBottom?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
};
export const StructogramLoopLast: FC<
	StructogramLoopLastProps
> = (props) => {
	const { condition, children, ...rest } = props;

	let body: ReactNode = (
		<StructogramProcess
			borderTop
			borderLeft
		/>
	);
	if (children !== undefined) {
		body = children;
	}
	return (
		<StructogramComponentWrapper {...rest}>
			<Box paddingLeft={2}>{body}</Box>
			<StructogramComponentText>
				{condition}
			</StructogramComponentText>
		</StructogramComponentWrapper>
	);
};
