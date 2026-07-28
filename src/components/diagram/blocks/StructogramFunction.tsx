import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";
import { StructogramProcess } from "./StructogramProcess";

type DiagramFuncProps = {
	declaration?: string;
	children?: ReactNode;

	borderTop?: boolean;
	borderBottom?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
};
export const StructogramFunction: FC<
	DiagramFuncProps
> = (props) => {
	const { declaration, children, ...rest } =
		props;

	let body: ReactNode = (
		<StructogramProcess
			borderTop
			borderLeft
			borderRight
		/>
	);
	if (children !== undefined) {
		body = children;
	}

	return (
		<StructogramComponentWrapper {...rest}>
			<StructogramComponentText align="center">
				{declaration}
			</StructogramComponentText>
			<Box paddingX={2}>{body}</Box>
		</StructogramComponentWrapper>
	);
};
