import { FC } from "react";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";

type StructogramProcessProps = {
	children?: string;

	borderTop?: boolean;
	borderBottom?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
};
export const StructogramProcess: FC<
	StructogramProcessProps
> = (props) => {
	const { children, ...rest } = props;

	return (
		<StructogramComponentWrapper {...rest}>
			<StructogramComponentText>
				{children}
			</StructogramComponentText>
		</StructogramComponentWrapper>
	);
};
