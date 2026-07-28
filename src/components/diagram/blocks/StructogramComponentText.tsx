import {
	Typography,
	TypographyProps,
} from "@mui/material";
import { FC, ReactNode } from "react";
import Latex from "react-latex-next";

type StructogramComponentTextProps =
	TypographyProps & {
		children: string | undefined;
	};
export const StructogramComponentText: FC<
	StructogramComponentTextProps
> = (props) => {
	const { children, sx, ...rest } = props;

	let body: ReactNode = "-";
	if (!!children) {
		body = (
			<Latex
				delimiters={[
					{
						left: "$",
						right: "$",
						display: false,
					},
				]}
			>
				{children}
			</Latex>
		);
	}

	return (
		<Typography
			padding={1.5}
			{...rest}
			sx={{
				fontFamily: "Fira Code",
				wordBreak: "break-word",
				fontVariantLigatures: "contextual",
				...sx,
			}}
		>
			{body}
		</Typography>
	);
};
