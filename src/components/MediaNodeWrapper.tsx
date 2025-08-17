import { type CSSProperties, type HTMLAttributes } from "react";
import useResizeHandler from "./useResizeHandlers";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import MediaActions from "./MediaActions";

export type AlignTypes = "left" | "center" | "right";

export interface MediaNodeWrapperProps extends HTMLAttributes<HTMLDivElement> {
  initialWidth: number;
  onResize?: (width: number) => void;
}

/**
 * Bu element wrapper elementi ile editore eklenen medya(video/resim/ses vb) nodeları hem
 * konumlandırmak hem de boyutlandırma işlemlerini yapmak için kullandığımız componenttir.
 */
function MediaNodeWrapper({
  children,
  initialWidth,
  onResize,
}: MediaNodeWrapperProps) {
  const isEditable = useLexicalEditable();
  const { ref, handlePointerDown } = useResizeHandler({
    initialWidth,
    onResize,
  });

  return (
    <div
      ref={ref}
      style={{ "--wrapper-width": `${initialWidth}%` } as CSSProperties}
      className="relative aspect-video w-(--wrapper-width) overflow-hidden flex justify-self-center group data-resizing:pointer-events-none">
      <MediaActions />
      {isEditable && (
        <span
          className="w-2 h-16 bg-black/30 border-1 border-white/80 absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full group-hover:block hidden cursor-col-resize"
          onPointerDown={(event) => {
            handlePointerDown(event, "left");
          }}
        />
      )}
      {children}
      {isEditable && (
        <span
          className="w-2 h-16 bg-black/30 border-1 border-white/80 absolute right-0.5 top-1/2 -translate-y-1/2 rounded-full group-hover:block hidden cursor-col-resize"
          onPointerDown={(event) => {
            handlePointerDown(event, "right");
          }}
        />
      )}
    </div>
  );
}

export default MediaNodeWrapper;
