import CodeRounded from "@mui/icons-material/CodeRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
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
import {
  type FC,
  Fragment,
  type MouseEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { AdaptiveButton } from "~/components/AdaptiveButton";
import { DiagramPreview } from "~/components/DiagramPreview";
import { StyledCodeEditor } from "~/components/StyledCodeEditor";
import { SyntaxHelperDialog } from "~/components/SyntaxHelperDialog";
import { lexerGetAllTokens, lexerInit } from "~/core/lexer";
import { parserGetAllNodes, parserInit } from "~/core/parser";
import { generateUniqueLink } from "~/core/sharing";
import { useEditorContent } from "~/hooks/useEditorContent";
import { useExportDiagram } from "~/hooks/useExportDiagram";
import { Layout } from "~/views/Layout";

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

  const [popoverExportMenuAnchor, setPopoverExportMenuAnchor] =
    useState<HTMLButtonElement | null>(null);
  const [syntaxHelperOpen, setSyntaxHelperOpen] = useState(false);

  const nodes = useMemo(() => {
    const tokens = lexerGetAllTokens(lexerInit(editorContent));
    return parserGetAllNodes(parserInit(tokens));
  }, [editorContent]);

  const handleCopyLink = useCallback(() => {
    const shareUrl = generateUniqueLink(editorContent, window.location.href);
    void navigator.clipboard.writeText(shareUrl);
    enqueueSnackbar("Link copied!", {
      variant: "success",
    });
  }, [editorContent, enqueueSnackbar]);

  const handlePopoverExportMenuOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setPopoverExportMenuAnchor(event.currentTarget);
    },
    [],
  );

  const handlePopoverExportMenuClose = useCallback(() => {
    setPopoverExportMenuAnchor(null);
  }, []);

  const handleSyntaxHelperOpen = useCallback(() => {
    setSyntaxHelperOpen(true);
  }, []);

  const handleSyntaxHelperClose = useCallback(() => {
    setSyntaxHelperOpen(false);
  }, []);

  const handleExportDiagram = useCallback(
    async (exportCallback: () => Promise<boolean>) => {
      const success = await exportCallback();
      enqueueSnackbar(
        success ? "Diagram exported" : "Failed to export diagram",
        {
          variant: success ? "info" : "error",
        },
      );
    },
    [enqueueSnackbar],
  );

  const handleExportJPEG = useCallback(() => {
    void handleExportDiagram(exportJPEG);
  }, [exportJPEG, handleExportDiagram]);

  const handleExportPNG = useCallback(() => {
    void handleExportDiagram(exportPNG);
  }, [exportPNG, handleExportDiagram]);

  const handleExportSVG = useCallback(() => {
    void handleExportDiagram(exportSVG);
  }, [exportSVG, handleExportDiagram]);

  return (
    <Fragment>
      <Layout
        slotAppBar={
          <ButtonGroup disableElevation variant="outlined">
            <AdaptiveButton
              collapsed={matchBreakpointXs}
              startIcon={<CodeRounded />}
              onClick={handleSyntaxHelperOpen}
              children="SYNTAX"
            />
            <AdaptiveButton
              collapsed={matchBreakpointXs}
              startIcon={<DownloadRounded />}
              onClick={handlePopoverExportMenuOpen}
              children="EXPORT"
            />
            <AdaptiveButton
              collapsed={matchBreakpointXs}
              endIcon={<SendRounded />}
              onClick={handleCopyLink}
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
      <SyntaxHelperDialog
        open={syntaxHelperOpen}
        onClose={handleSyntaxHelperClose}
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
        onClose={handlePopoverExportMenuClose}
      >
        <Paper sx={{ padding: 0.125 }}>
          <MenuList>
            <MenuItem onClick={handleExportJPEG}>
              <ListItemIcon>
                <DownloadRounded />
              </ListItemIcon>
              <ListItemText>Save as JPEG</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleExportPNG}>
              <ListItemIcon>
                <DownloadRounded />
              </ListItemIcon>
              <ListItemText>Save as PNG</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleExportSVG}>
              <ListItemIcon>
                <DownloadRounded />
              </ListItemIcon>
              <ListItemText>Save as SVG</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </Fragment>
  );
};
