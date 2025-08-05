import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
  $isCustomParagraphNode,
  CustomParagraphNode,
} from "../nodes/CustomParagraphNode";
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

/**
 * @description Aktif paragrafa data-focus attribute eklemek için oluşturduğumuz plugindir.
 * Sadece bir önceki node ve mevcut nodedan attribute silip ekleyerek 3 işlemde güncelleme yapıyoruz.
 */
function ParagraphNodeFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let prevFocusedNodeKey: string | null = null;

    const unregisterTest = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) return false;

        const anchorNode = selection.anchor.getNode();
        if (!$isCustomParagraphNode(anchorNode)) return false;

        const currentFocusedNodeKey = anchorNode.getKey();

        // Focus değişmediyse hiçbir şey yapma
        if (prevFocusedNodeKey === currentFocusedNodeKey) return true;

        // Önceki node'un focus'unu kaldır
        if (prevFocusedNodeKey) {
          const prevNode =
            $getNodeByKey<CustomParagraphNode>(prevFocusedNodeKey);
          prevNode?.updateFocusTest(false);
        }

        // Yeni node'a focus ver
        anchorNode.updateFocusTest(true);
        prevFocusedNodeKey = currentFocusedNodeKey;

        return true;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => unregisterTest();
  }, [editor]);

  return null;
}

export default ParagraphNodeFocusPlugin;