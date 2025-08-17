import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useRef, type PointerEvent } from "react";

type DirectionTypes = 'left' | 'right'

interface PositioningState {
  startWidth: number;
  startHeight: number;
  ratio: number;
  currentWidth: number;
  currentHeight: number;
}

function useResizeHandler() {
  const ref = useRef<HTMLDivElement>(null);
  const positioningRef = useRef<PositioningState>({
    startWidth: 0,
    startHeight: 0,
    ratio: 0,
    currentWidth: 0,
    currentHeight: 0,
  })
  const [editor] = useLexicalComposerContext();

  function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
    event.preventDefault();
    event.stopPropagation();

    console.log('pointer move')
  }

  function handlePointerUp(event: PointerEvent<HTMLSpanElement>) {
    console.log(event)
    event.preventDefault();
    event.stopPropagation();
  }


  function handlePointerDown(event: PointerEvent<HTMLSpanElement>, direction: DirectionTypes) {
    if (!editor.isEditable()) {
      return;
    }
    
    if(ref.current){
      event.preventDefault();
      event.stopPropagation();
      const { width, height } = ref.current.getBoundingClientRect();
      positioningRef.current.startWidth = width;
      positioningRef.current.startHeight = height;
      positioningRef.current.ratio = width / height;
      positioningRef.current.currentWidth = width;
      positioningRef.current.currentHeight = height;

      ref.current.style.width= width + 'px'
    }
    
  }

  return { ref, handlePointerDown, handlePointerMove,handlePointerUp }
}

export default useResizeHandler;