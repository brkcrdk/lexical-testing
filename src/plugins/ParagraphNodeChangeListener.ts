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

function ParagraphNodeChangeListener() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let prevFocusedNodeKey: null | string = null;

    const unregisterTest = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const isParagraphNode = $isCustomParagraphNode(anchorNode);

          if (isParagraphNode) {
            const currentFocusedNodeKey = anchorNode.getKey();

            if (prevFocusedNodeKey !== currentFocusedNodeKey) {
              if (prevFocusedNodeKey) {
                const prevFocusedNode =
                  $getNodeByKey<CustomParagraphNode>(prevFocusedNodeKey);

                if (prevFocusedNode) {
                  prevFocusedNode.updateFocusTest(false);
                }
              }

              anchorNode.updateFocusTest(true);
            }
            prevFocusedNodeKey = currentFocusedNodeKey;

            return true;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      unregisterTest();
    };
  }, [editor]);

  return null;
}

export default ParagraphNodeChangeListener;