import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import type { MediaNodeWrapperProps } from "./MediaNodeWrapper";

type DirectionTypes = "left" | "right";

const MIN_WIDTH = 200;
const MAX_WIDTH = 500;

/**
 * Genişlik değerinin min ve max arasında kalmasını sağlar.
 */
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

interface PositioningState {
  direction: DirectionTypes;
  startX: number;
  isResizing: boolean;
  startWidth: number;
  currentWidth: number;
}

const inititialPositioningState: PositioningState = {
  direction: "left",
  startWidth: 0,
  currentWidth: 0,
  startX: 0,
  isResizing: false,
};

type Props = Omit<MediaNodeWrapperProps, "children">;

function useResizeHandler({ initialWidth, onResize }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const positioningRef = useRef<PositioningState>({
    ...inititialPositioningState,
    currentWidth: initialWidth,
  });

  function handlePointerMove(event: PointerEvent) {
    if (positioningRef.current.isResizing) {
      const pointerEvent = event as PointerEvent;

      // 1. Mevcut pointer pozisyonu
      const currentX = pointerEvent.clientX;

      // 2. Başlangıç pozisyonu
      const startX = positioningRef.current.startX;

      const deltaX = currentX - startX;
      const newWidth = positioningRef.current.startWidth + deltaX * 2; // 2x çünkü her iki yöne

      const clampedPercentage = clamp(newWidth, MIN_WIDTH, MAX_WIDTH);

      if (ref.current) {
        ref.current.setAttribute("data-resizing", "");
        ref.current.style.width = clampedPercentage + "px";
      }
    }
  }

  function handlePointerUp() {
    if (ref.current) {
      ref.current.removeAttribute("data-resizing");
    }
    positioningRef.current = inititialPositioningState;

    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    if (onResize) {
      onResize(positioningRef.current.currentWidth);
    }
  }

  function handlePointerDown(
    event: ReactPointerEvent<HTMLSpanElement>,
    direction: DirectionTypes
  ) {
    if (ref.current) {
      event.preventDefault();
      event.stopPropagation();
      const { width } = ref.current.getBoundingClientRect();
      positioningRef.current.startWidth = width;
      positioningRef.current.currentWidth = width;
      positioningRef.current.startX = event.clientX;
      positioningRef.current.direction = direction;
      positioningRef.current.isResizing = true;

      ref.current.removeAttribute("data-resizing");

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    }
  }

  return {
    ref,
    handlePointerDown,
  };
}

export default useResizeHandler;
