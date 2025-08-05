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
 * @description Custom paragraf node'larında focus değişikliklerini takip eder ve focus durumlarını günceller.
 * Performans için sadece önceki focus'lu ve şu anki focus'lu node'ları günceller.
 * Bu, çok sayıda paragraf içeren büyük dokümanlarda gereksiz DOM güncellemelerini önler.
 * 
 * Amaç: caretın aktif olarak buluduğu paragraf nodeune data-focus attributeu eklemek.
 */
function ParagraphNodeChangeListener() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let prevFocusedNodeKey: string | null = null;

    const unregisterTest = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();

        // Early return pattern kullanarak if'leri azaltalım
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

export default ParagraphNodeChangeListener;