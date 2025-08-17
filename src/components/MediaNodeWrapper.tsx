import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useMemo, useRef, type HTMLAttributes } from "react";
import useResizeHandler from "./useResizeHandlers";

interface Props extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: number;
}

/**
 * Bu element wrapper elementi ile editore eklenen medya(video/resim/ses vb) nodeları hem
 * konumlandırmak hem de boyutlandırma işlemlerini yapmak için kullandığımız componenttir.
 */
function MediaNodeWrapper({ children }: Props) {
  const { ref, handlePointerDown, handlePointerMove, handlePointerUp } =
    useResizeHandler();
  // const [editor] = useLexicalComposerContext();
  // const ref = useRef<HTMLDivElement>(null);

  // const editorRootElement = editor.getRootElement();

  // const maxSizes = useMemo(() => {
  //   console.log();
  //   if (editorRootElement) {
  //     const { width, height } = editorRootElement.getBoundingClientRect();
  //     return {
  //       width: width - 20,
  //       height: height - 20,
  //     };
  //   }
  // }, [editorRootElement]);

  // const maxWidthContainer = useMemo(() => {
  //   if (maxWidth) {
  //     return maxWidth;
  //   }
  //   if (editorRootElement) {
  //     return editorRootElement.getBoundingClientRect().width - 20;
  //   }
  //   return 100;
  // }, [maxWidth, editorRootElement]);

  // const maxHeightContainer = useMemo(() => {
  //   if (maxHeight) {
  //     return maxHeight;
  //   }
  //   if (editorRootElement) {
  //     return editorRootElement.getBoundingClientRect().height - 20;
  //   }
  //   return 100;
  // }, [maxHeight, editorRootElement]);

  // const minWidth = 100;
  // const minHeight = 100;

  return (
    <div
      ref={ref}
      className="relative aspect-video w-[80%] overflow-hidden flex justify-self-center group">
      <span
        className="w-2 h-16 bg-black/30 border-1 border-white/80 absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full group-hover:block hidden cursor-col-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, "left");
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {children}
      <span
        className="w-2 h-16 bg-black/30 border-1 border-white/80 absolute right-0.5 top-1/2 -translate-y-1/2 rounded-full group-hover:block hidden cursor-col-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, "right");
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </div>
  );
}

export default MediaNodeWrapper;