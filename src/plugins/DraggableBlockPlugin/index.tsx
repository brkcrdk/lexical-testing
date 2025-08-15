import { DraggableBlockPlugin_EXPERIMENTAL } from "@lexical/react/LexicalDraggableBlockPlugin";
import { useRef, useState } from "react";
import MenuComponent from "./MenuComponent";

function DraggableBlockPlugin() {
  const menuRef = useRef<HTMLDivElement>(null);
  const targetLineRef = useRef<HTMLDivElement>(null);
  const [draggableElement, setDraggableElement] = useState<HTMLElement | null>(null);

  return (
    <DraggableBlockPlugin_EXPERIMENTAL
      anchorElem={document.getElementById("editor-content") || undefined}
      menuRef={menuRef}
      targetLineRef={targetLineRef}
      menuComponent={draggableElement ? <MenuComponent menuRef={menuRef} targetElement={draggableElement} /> : null}
      targetLineComponent={
        <div
          ref={targetLineRef}
          className="pointer-events-none bg-blue-600 h-1 absolute left-0 top-0 will-change-transform"
        />
      }
      isOnMenu={(element) => {
        return Boolean(element.closest("[data-draggable-block-menu]"));
      }}
      onElementChanged={setDraggableElement}
    />
  );
}

export default DraggableBlockPlugin;
