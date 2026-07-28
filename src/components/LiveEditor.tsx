import DownloadRounded from "@mui/icons-material/DownloadRounded";
import LinkRounded from "@mui/icons-material/LinkRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import type { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSnackbar } from "notistack";
import { type FC, Fragment, useEffect, useState } from "react";
import { AdaptiveButton } from "~/components/AdaptiveButton";
import { DiagramPreview } from "~/components/DiagramPreview";
import { StyledCodeEditor } from "~/components/StyledCodeEditor";
import { lexerGetAllTokens, lexerInit } from "~/core/lexer";
import { DiagramNode, parserGetAllNodes, parserInit } from "~/core/parser";
import { useEditorContent } from "~/hooks/useEditorContent";
import { useExportDiagram } from "~/hooks/useExportDiagram";
import { Layout } from "~/views/Layout";
import { generateUniqueLink } from "../core/sharing";

/**
 * The main component of the application.
 * It defines the primary interface of the application, as well as the main logic.
 *
 * The layout is controlled by the "Layout" component.
 * The "StyledCodeEditor" component provides text editor.
 * The "DiagramPreview" component provides the diagram preview.
 */
export const LiveEditor: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { exportJPEG, exportPNG, exportSVG } = useExportDiagram(
    "structogram-preview-region",
  );
  const { editorContent, setEditorContent } = useEditorContent(
    window.location.href,
    "autosaveContent",
  );
  const matchBreakpointXs = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md"),
  );

  const [nodes, setNodes] = useState<DiagramNode[]>([]);
  const [popoverExportMenuAnchor, setPopoverExportMenuAnchor] =
    useState<HTMLButtonElement | null>(null);
  const [popoverShareMenuAnchor, setPopoverShareMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  // Fires when the editor content changes
  // Signals the lexer and parser to re-parse the content
  // One issue is that the entire abstract syntax tree is re-parsed on every keystroke
  // This is not ideal, but it is a simple solution for now
  useEffect(() => {
    const tokens = lexerGetAllTokens(lexerInit(editorContent));
    const nodes = parserGetAllNodes(parserInit(tokens));
    setNodes(nodes);
  }, [editorContent]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      generateUniqueLink(editorContent, window.location.href),
    );
    enqueueSnackbar("Link copied to clipboard", {
      variant: "info",
    });
  };
  const handleCopyEmbed = () => {
    const srcURL = generateUniqueLink(editorContent, window.location.href);
    const embed = `<iframe loading="lazy" height="auto" width="100%" src="${srcURL}" style="aspect-ratio: 16/10; border: none;"></iframe>`;

    navigator.clipboard.writeText(embed);
    enqueueSnackbar("Link copied to clipboard", {
      variant: "info",
    });
  };

  const handlePopoverExportMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setPopoverExportMenuAnchor(event.currentTarget);
  };

  const handlePopoverShareMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setPopoverShareMenuAnchor(event.currentTarget);
  };

  const handleExportDiagram = async (
    exportCallback: () => Promise<boolean>,
  ) => {
    exportCallback().then((success) => {
      if (success) {
        enqueueSnackbar("Diagram exported", {
          variant: "info",
        });
        return;
      }
      enqueueSnackbar("Failed to export diagram", {
        variant: "error",
      });
    });
  };

  return (
    <Fragment>
      <Layout
        slotAppBar={
          <ButtonGroup disableElevation variant="outlined">
            <AdaptiveButton
              collapsed={matchBreakpointXs}
              startIcon={<DownloadRounded />}
              onClick={handlePopoverExportMenuOpen}
              children="EXPORT"
            />
            <AdaptiveButton
              collapsed={matchBreakpointXs}
              endIcon={<SendRounded />}
              onClick={handlePopoverShareMenuOpen}
              children="SHARE"
            />
          </ButtonGroup>
        }
        slotPanelLeft={
          <StyledCodeEditor
            value={editorContent}
            onValueChange={setEditorContent}
          />
        }
        slotPanelRight={
          <DiagramPreview
            id="structogram-preview-region"
            nodes={nodes}
            boxProps={{
              height: "100%",
              padding: 4,
              userSelect: "none",
            }}
          />
        }
      />
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorEl={popoverExportMenuAnchor}
        open={popoverExportMenuAnchor !== null}
        onClose={() => setPopoverExportMenuAnchor(null)}
      >
        <Paper sx={{ padding: "1px" }}>
          <MenuList>
            <MenuItem onClick={() => handleExportDiagram(exportJPEG)}>
              <ListItemIcon>
                <DownloadRounded />
              </ListItemIcon>
              <ListItemText>Save as JPEG</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleExportDiagram(exportPNG)}>
              <ListItemIcon>
                <DownloadRounded />
              </ListItemIcon>
              <ListItemText>Save as PNG</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleExportDiagram(exportSVG)}>
              <ListItemIcon>
                <DownloadRounded />
              </ListItemIcon>
              <ListItemText>Save as SVG</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorEl={popoverShareMenuAnchor}
        open={popoverShareMenuAnchor !== null}
        onClose={() => setPopoverShareMenuAnchor(null)}
      >
        <Paper sx={{ padding: "1px" }}>
          <MenuList>
            <MenuItem onClick={handleCopyLink}>
              <ListItemIcon>
                <LinkRounded />
              </ListItemIcon>
              <ListItemText>Copy Link</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleCopyEmbed}>
              <ListItemIcon>
                <LinkRounded />
              </ListItemIcon>
              <ListItemText>Copy Iframe Embed</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </Fragment>
  );
};
