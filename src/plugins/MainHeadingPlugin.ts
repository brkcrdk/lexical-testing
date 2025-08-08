import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  INSERT_LINE_BREAK_COMMAND,
} from "lexical";
import { useEffect } from "react";
import {
  $isMainHeadingNode,
} from "../nodes/MainHeadingNode";

/**
 * NOTE: Bu tag default heading tagleri gibi olmadığı için backspace, del vb şekilde silinip kaldırılamıyor.
 * Bu nedenle fixed layout mantığımıza direk uyum sağlıyor.
 * 
 * Bu pluginde ayrıca bu tagin içindeyken `shift+enter` tuşlarına basıldığında yeni bir satır oluşturulmasını
 * engelleyecek command de yer alır.
 */
function MainHeadingPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterInsertLineBreakCommand = editor.registerCommand(
      INSERT_LINE_BREAK_COMMAND,
      () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const anchorParent = anchorNode.getParent();

          if (
            $isMainHeadingNode(anchorParent) ||
            selection.anchor.offset === 0
          ) {
            return true;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      unregisterInsertLineBreakCommand();
    };
  }, [editor]);

  return null;
}

export default MainHeadingPlugin;
