import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";
import { StructogramProcess } from "./StructogramProcess";

type StructogramLoopFirstProps = {
	condition: string | undefined;
	children?: ReactNode;
	borderTop?: boolean;
	borderBottom?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
};
export const StructogramLoopFirst: FC<
	StructogramLoopFirstProps
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
			<StructogramComponentText>
				{condition}
			</StructogramComponentText>
			<Box paddingLeft={2}>{body}</Box>
		</StructogramComponentWrapper>
	);
};
