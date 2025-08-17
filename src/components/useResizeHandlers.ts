import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import type { MediaNodeWrapperProps } from "./MediaNodeWrapper";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

type DirectionTypes = "left" | "right";

// Wrapperin min ve max genişliğini yüzdesel olarak ifade eder.
const MIN_WIDTH = 30;
const MAX_WIDTH = 100;

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
  rootWidth: number;
}

const inititialPositioningState: PositioningState = {
  direction: "left",
  startWidth: 0,
  currentWidth: 0,
  startX: 0,
  isResizing: false,
  rootWidth: 0,
};

type Props = Omit<MediaNodeWrapperProps, "children">;

function useResizeHandler({ initialWidth, onResize }: Props) {
  const [editor] = useLexicalComposerContext();
  const ref = useRef<HTMLDivElement>(null);
  const positioningRef = useRef<PositioningState>({
    ...inititialPositioningState,
    currentWidth: initialWidth,
  });

  function handlePointerMove(event: PointerEvent) {
    if (positioningRef.current.isResizing) {
      const state = positioningRef.current;
      if (!state.isResizing) return;

      state.isResizing = true;
      const deltaX = event.clientX - state.startX;
      const deltaPercent = (deltaX / state.rootWidth) * 100;

      let newWidth: number;

      if (state.direction === "right") {
        // sağ handle → sağa genişler, sola daralır
        newWidth = state.startWidth + deltaPercent;
      } else {
        // sol handle → sağa daralır, sola genişler
        newWidth = state.startWidth - deltaPercent;
      }

      newWidth = clamp(newWidth, MIN_WIDTH, MAX_WIDTH);

      state.currentWidth = newWidth;

      if (ref.current) {
        ref.current.style.setProperty("--wrapper-width", `${newWidth}%`);
      }
    }
  }

  function handlePointerUp() {
    positioningRef.current.isResizing = false;

    if (ref.current) {
      ref.current.removeAttribute("data-resizing");
    }

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
    const rootElement = editor.getRootElement();
    if (ref.current && rootElement) {
      const { width: rootWidth } = rootElement.getBoundingClientRect();

      positioningRef.current = {
        ...positioningRef.current,
        direction,
        isResizing: true,
        startX: event.clientX,
        startWidth: positioningRef.current.currentWidth,
        rootWidth,
      };

      ref.current.setAttribute("data-resizing", "");

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
