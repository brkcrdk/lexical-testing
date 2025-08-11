import { DraggableBlockPlugin_EXPERIMENTAL } from "@lexical/react/LexicalDraggableBlockPlugin";
import { useRef, useState } from "react";
import { Plus, GripVertical } from "lucide-react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $getNearestNodeFromDOMNode } from "lexical";

interface Props {
  anchorElem: HTMLElement | undefined;
}

function DraggableBlockPlugin({ anchorElem= document.body }: Props) {
  const [editor] = useLexicalComposerContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const targetLineRef = useRef<HTMLDivElement>(null);
  const [draggableElement, setDraggableElement] = useState<HTMLElement | null>(
    null
  );

  function insertBlock(){
    if (!draggableElement || !editor) {
      return;
    }

    editor.update(() => {
      const node = $getNearestNodeFromDOMNode(draggableElement);
      if (!node) {
        return;
      }

      const pNode = $createParagraphNode();
      node.insertAfter(pNode);
      pNode.select();
    });
  }

  return (
    <DraggableBlockPlugin_EXPERIMENTAL
      anchorElem={anchorElem}
      menuRef={menuRef}
      targetLineRef={targetLineRef}
      menuComponent={
        <div
          data-draggable-block-menu
          className="rounded-sm opacity-0 absolute left-0 top-0 will-change-transform flex gap-0.5 p-0.5"
          ref={menuRef}
        >
          <button className="p-1" onClick={insertBlock}>
            <Plus size={14} />
          </button>
          <button className="p-1 cursor-grab active:cursor-grabbing" onClick={()=>{
            console.log('xx')
          }}>
            <GripVertical size={14} />
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