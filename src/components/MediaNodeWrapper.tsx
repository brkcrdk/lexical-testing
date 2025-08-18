import { type CSSProperties, type HTMLAttributes } from "react";
import useResizeHandler from "./useResizeHandlers";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import MediaActions from "./MediaActions";

export type AlignTypes = "start" | "center" | "end";

export interface MediaNodeWrapperProps extends HTMLAttributes<HTMLDivElement> {
  initialWidth: number;
  onResize?: (width: number) => void;
  onAlignChange?: (align: AlignTypes) => void;
  align: AlignTypes;
}

/**
 * Bu element wrapper elementi ile editore eklenen medya(video/resim/ses vb) nodeları hem
 * konumlandırmak hem de boyutlandırma işlemlerini yapmak için kullandığımız componenttir.
 */
function MediaNodeWrapper({
  children,
  initialWidth,
  onResize,
  onAlignChange,
  align,
}: MediaNodeWrapperProps) {
  const isEditable = useLexicalEditable();
  const { ref, handlePointerDown } = useResizeHandler({
    initialWidth,
    onResize,
  });

  return (
    <div
      ref={ref}
      style={
        {
          "--wrapper-width": `${initialWidth}%`,
          justifySelf: align,
        } as CSSProperties
      }
      className="relative aspect-video w-(--wrapper-width) overflow-hidden flex group data-resizing:pointer-events-none overflow-hidden">
      <MediaActions onAlignChange={onAlignChange} align={align} />
      {isEditable && (
        <span
          className="w-2 h-16 bg-black/30 border-1 border-white/80 absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full invisible group-hover:visible cursor-col-resize opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onPointerDown={(event) => {
            handlePointerDown(event, "left");
          }}
        />
      )}
      {children}
      {isEditable && (
        <span
          className="w-2 h-16 bg-black/30 border-1 border-white/80 absolute right-0.5 top-1/2 -translate-y-1/2 rounded-full invisible group-hover:visible cursor-col-resize opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onPointerDown={(event) => {
            handlePointerDown(event, "right");
          }}
        />
      )}
    </div>
  );
}

export default MediaNodeWrapper;
