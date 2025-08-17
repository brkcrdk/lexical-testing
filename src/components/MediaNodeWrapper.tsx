import { type CSSProperties, type HTMLAttributes } from "react";
import useResizeHandler from "./useResizeHandlers";

interface Props extends HTMLAttributes<HTMLDivElement> {
  width: number;
}

/**
 * Bu element wrapper elementi ile editore eklenen medya(video/resim/ses vb) nodeları hem
 * konumlandırmak hem de boyutlandırma işlemlerini yapmak için kullandığımız componenttir.
 */
function MediaNodeWrapper({ children, width }: Props) {
  const { ref, handlePointerDown } = useResizeHandler({ width });

  return (
    <div
      ref={ref}
      style={{ "--wrapper-width": `${width}%` } as CSSProperties}
      className="relative aspect-video w-(--wrapper-width) overflow-hidden flex justify-self-center group data-resizing:pointer-events-none">
      <span
        className="w-2 h-16 bg-black/30 border-1 border-white/80 absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full group-hover:block hidden cursor-col-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, "left");
        }}
      />
      {children}
      <span
        className="w-2 h-16 bg-black/30 border-1 border-white/80 absolute right-0.5 top-1/2 -translate-y-1/2 rounded-full group-hover:block hidden cursor-col-resize"
        onPointerDown={(event) => {
          handlePointerDown(event, "right");
        }}
      />
    </div>
  );
}

export default MediaNodeWrapper;
