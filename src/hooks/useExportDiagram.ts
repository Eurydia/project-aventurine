import { saveAs } from "file-saver";
import { toJpeg, toPng, toSvg } from "html-to-image";
import { useCallback } from "react";

export const useExportDiagram = (targetElementId: string) => {
  const exportDiagram = useCallback(
    async (convert: (element: HTMLElement) => Promise<string>) => {
      const htmlNode = document.getElementById(targetElementId);
      if (htmlNode === null) {
        return false;
      }

      const dataUrl = await convert(htmlNode);
      if (dataUrl === null) {
        return false;
      }

      saveAs(dataUrl, "structogram");
      return true;
    },
    [targetElementId],
  );

  const exportSVG = useCallback(
    () => exportDiagram(toSvg),
    [exportDiagram],
  );
  const exportPNG = useCallback(
    () => exportDiagram(toPng),
    [exportDiagram],
  );
  const exportJPEG = useCallback(
    () => exportDiagram(toJpeg),
    [exportDiagram],
  );

  return {
    exportSVG,
    exportJPEG,
    exportPNG,
  };
};
