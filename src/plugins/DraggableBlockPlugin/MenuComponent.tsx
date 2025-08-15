import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $createTextNode, $getNearestNodeFromDOMNode } from "lexical";
import { GripVertical, Plus } from "lucide-react";
import type { Ref } from "react";

interface Props{
  menuRef: Ref<HTMLDivElement>
  targetElement: HTMLElement
}

function MenuComponent({menuRef, targetElement}:Props) {
  const [editor] = useLexicalComposerContext();

  // Eğer target elementte sürüklenmesini istemiyorsak bu attribute ekli oluyor ve sürükleme
  // aksiyonlarını gizliyoruz.
  if (targetElement.hasAttribute("data-block-draggable")) return null;
  
  function insertBlock() {
    if (!editor)  return;
    
    editor.update(() => {
      const node = $getNearestNodeFromDOMNode(targetElement);
      if (!node) {
        return;
      }

      const newNode = $createParagraphNode();
      // Slash commandini eklediğimiz zaman otomatik olarak yeni node seçme dropdownı açılıyor.
      const textNode = $createTextNode("/");
      newNode.append(textNode);
      node.insertAfter(newNode);
      newNode.select();
    });
  }

  return (
    <div
      data-draggable-block-menu
      className="rounded-sm absolute left-0 top-0 will-change-transform flex gap-0.5 p-0.5"
      ref={menuRef}>
      <button className="p-1" onClick={insertBlock}>
        <Plus size={14} />
      </button>
      <button
        className="p-1 cursor-grab active:cursor-grabbing"
        onClick={() => {
          console.log("xx");
        }}>
        <GripVertical size={14} />
      </button>
    </div>
  );
}

export default MenuComponent;