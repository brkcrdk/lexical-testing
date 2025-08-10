import { DraggableBlockPlugin_EXPERIMENTAL } from "@lexical/react/LexicalDraggableBlockPlugin";
import { useRef, useState } from "react";
import { Plus, GripVertical } from "lucide-react";

interface Props {
  anchorElem: HTMLElement | undefined;
}

function DraggableBlockPlugin({ anchorElem= document.body }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  const targetLineRef = useRef<HTMLDivElement>(null);
  const [draggableElement, setDraggableElement] = useState<HTMLElement | null>(
    null
  );
  return (
    <DraggableBlockPlugin_EXPERIMENTAL
      anchorElem={anchorElem}
      menuRef={menuRef}
      targetLineRef={targetLineRef}
      menuComponent={
        <div
          data-draggable-block-menu
          className="rounded-sm opacity-0 absolute left-0 top-0 will-change-transform flex gap-0.5 p-0.5"
          ref={menuRef}>
          <button className="">
            <Plus size={12} />
          </button>
          <button className="cursor-grab active:cursor-grabbing">
            <GripVertical size={12} />
          </button>
        </div>
      }
      targetLineComponent={
        <div
          ref={targetLineRef}
          className="pointer-events-none bg-blue-600 h-1 absolute left-0 top-0 opacity-0 will-change-transform"
        />
      }
      isOnMenu={(element) => {
        return !!element.closest("[data-draggable-block-menu]");
      }}
      onElementChanged={setDraggableElement}
    />
  );
}

export default DraggableBlockPlugin;