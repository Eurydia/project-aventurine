import { Box, SxProps, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { DiagramNode } from "~/core/parser";
import { Diagram } from "./Diagram";

/**
 * This component is a preview of the diagram.
 * It prepares the root-level nodes and recursively renders their children.
 */
type DiagramPreviewProps = {
  nodes: DiagramNode[];
  id: string;
  boxProps: SxProps;
};
export const DiagramPreview: FC<DiagramPreviewProps> = (props): ReactNode => {
  return (
    <Box sx={props.boxProps}>
      <Box
        id={props.id}
        sx={(t) => ({
          maxWidth: "640px",
          backgroundColor: t.palette.common.white,
          borderColor: t.palette.text.primary,
        })}
      >
        {props.nodes.length === 0 ? (
          <Typography sx={{ fontStyle: "italic" }}>
            Nothing to display.
          </Typography>
        ) : (
          props.nodes.map((node, index) => (
            <Diagram
              key={`top-level-node-${index}`}
              node={node}
              border={{
                left: true,
                right: true,
                top: true,
                bottom: index === props.nodes.length - 1,
              }}
            />
          ))
        )}
      </Box>
    </Box>
  );
};
