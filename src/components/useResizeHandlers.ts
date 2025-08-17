import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";

type DirectionTypes = "left" | "right";

const MIN_WIDTH = 30;
const MAX_WIDTH = 90;

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
  currentPercentage: number;
}

const inititialPositioningState: PositioningState = {
  direction: "left",
  startWidth: 0,
  currentWidth: 0,
  startX: 0,
  isResizing: false,
  currentPercentage: 0,
};

interface Props {
  width: number;
  onResize: (width: number) => void;
}

function useResizeHandler({ width, onResize }: Props) {
  const [editor] = useLexicalComposerContext();
  const ref = useRef<HTMLDivElement>(null);
  const positioningRef = useRef<PositioningState>(inititialPositioningState);

  function handlePointerMove(event: PointerEvent) {
    if (positioningRef.current.isResizing) {
      const currentX = event.clientX;
      const startX = positioningRef.current.startX;
      const deltaX = currentX - startX;

      const startWidth = positioningRef.current.startWidth;
      const percentageChange = (deltaX / startWidth) * 100;

      const direction = positioningRef.current.direction;
      let newPercentage;

      if (direction === "right") {
        newPercentage = width + percentageChange;
      } else {
        newPercentage = width + percentageChange;
      }

      const clampedPercentage = clamp(newPercentage, MIN_WIDTH, MAX_WIDTH);
      positioningRef.current.currentPercentage = clampedPercentage;

      if (ref.current) {
        ref.current.setAttribute("data-resizing", "");
        ref.current.style.setProperty(
          "--wrapper-width",
          clampedPercentage + "%"
        );
      }
    }
  }

  function handlePointerUp() {
    if (ref.current) {
      ref.current.removeAttribute("data-resizing");
    }
    positioningRef.current = inititialPositioningState;
    onResize(positioningRef.current.currentPercentage);

    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
  }

  function handlePointerDown(
    event: ReactPointerEvent<HTMLSpanElement>,
    direction: DirectionTypes
  ) {
    if (!editor.isEditable()) {
      return;
    }

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