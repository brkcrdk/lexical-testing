import { type CSSProperties, type HTMLAttributes } from "react";
import useResizeHandler from "./useResizeHandlers";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";

interface Props extends HTMLAttributes<HTMLDivElement> {
  width: number;
  onResize?: (width: number) => void;
}

/**
 * Bu element wrapper elementi ile editore eklenen medya(video/resim/ses vb) nodeları hem
 * konumlandırmak hem de boyutlandırma işlemlerini yapmak için kullandığımız componenttir.
 */
function MediaNodeWrapper({ children, width, onResize }: Props) {
  const isEditable = useLexicalEditable();
  const { ref, handlePointerDown } = useResizeHandler({
    width,
    onResize,
  });

  return (
    <div
      ref={ref}
      style={{ "--wrapper-width": `${width}%` } as CSSProperties}
      className="relative aspect-video w-(--wrapper-width) overflow-hidden flex justify-self-center group data-resizing:pointer-events-none">
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
