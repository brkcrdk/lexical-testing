import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import type { MediaNodeWrapperProps } from "./MediaNodeWrapper";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

type DirectionTypes = "left" | "right";

// Wrapper’ın min ve max genişliği (%)
const MIN_WIDTH = 30;
const MAX_WIDTH = 100;

/**
 * Genişlik değerini min ve max arasında tutar
 */
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

interface PositioningState {
  /** Drag başlangıcındaki X */
  startX: number;
  /** Root genişliği (px) */
  rootWidth: number;
  /** Drag öncesi genişlik (%) */
  startWidth: number;
  /** Drag sırasındaki genişlik (%) */
  currentWidth: number;
  isResizing: boolean;
  direction: DirectionTypes;
}

const inititialPositioningState: PositioningState = {
  direction: "left",
  startX: 0,
  rootWidth: 0,
  startWidth: 0,
  currentWidth: 0,
  isResizing: false,
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
    const state = positioningRef.current;
    if (!state.isResizing) return;

    const deltaX = event.clientX - state.startX;
    const deltaPercent = (deltaX / state.rootWidth) * 100;

    /**
     * Sağ ve sol handleların davranışlarını ayarladığımız kısım.
     * Sağ handle: sağa genişler, sola daralır
     * Sol handle: sağa daralır, sola genişler
     */
    let newWidth: number;
    if (state.direction === "right") {
      newWidth = state.startWidth + deltaPercent;
    } else {
      newWidth = state.startWidth - deltaPercent;
    }

    // Clamp’le sınırla
    newWidth = clamp(newWidth, MIN_WIDTH, MAX_WIDTH);

    state.currentWidth = newWidth;
    if (ref.current) {
      ref.current.style.setProperty("--wrapper-width", `${newWidth}%`);
    }
  }

  function handlePointerUp() {
    const state = positioningRef.current;
    state.isResizing = false;

    if (ref.current) {
      ref.current.removeAttribute("data-resizing");
    }

    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);

    if (onResize) {
      onResize(state.currentWidth);
    }
  }

  function handlePointerDown(
    event: ReactPointerEvent<HTMLSpanElement>,
    direction: DirectionTypes
  ) {
    const rootElement = editor.getRootElement();

    if (ref.current && rootElement) {
      const { width: rootWidth } = rootElement.getBoundingClientRect();
      /**
       * Sürükleme işlemi sırasında kullanacağımız verileri ilk tıklama anında
       * saklıyoruz ve sürüklerken de `handlePointerMove` ile bu değerleri kullanarak
       * sürükleme işlemini gerçekleştiriyoruz.
       */
      positioningRef.current = {
        direction,
        isResizing: true,
        startX: event.clientX,
        rootWidth,
        /**
         * Bu iki değer başlangıç olarak aynı değerdir. Fakat `startWidth` sürükleme
         * işlemi sırasında değişmeyecektir ve hep aynı kaldır ama `currentWidth`
         * sürükleme işlemi sırasında değişecektir. Bu sayede hesaplamalar yapalırken
         * iki değer arasındaki farklar kullanılır.
         */
        startWidth: positioningRef.current.currentWidth,
        currentWidth: positioningRef.current.currentWidth,
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
