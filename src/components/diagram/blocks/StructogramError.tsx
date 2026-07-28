import { FC } from "react";
import { StructogramComponentText } from "./StructogramComponentText";
import { StructogramComponentWrapper } from "./StructogramComponentWrapper";

type StructogramErrorProps = {
	context: string;
	reason: string;
	lineNumber: number;
	charNumber: number;
	caretOffset: number;

	borderTop?: boolean;
	borderBottom?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
};
export const StructogramError: FC<
	StructogramErrorProps
> = (props) => {
	const {
		context,
		reason,
		lineNumber,
		charNumber,
		caretOffset,

		...rest
	} = props;
	const errorText = `At line ${lineNumber}, character ${charNumber}: ${reason}`;
	const caretText = "~".repeat(caretOffset) + "^";

	return (
		<StructogramComponentWrapper {...rest}>
			<StructogramComponentText>
				{errorText}
			</StructogramComponentText>
			<StructogramComponentText paddingY={0}>
				{context}
			</StructogramComponentText>
			<StructogramComponentText paddingY={0}>
				{caretText}
			</StructogramComponentText>
		</StructogramComponentWrapper>
	);
};
