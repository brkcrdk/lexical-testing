import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $isCustomParagraphNode } from "../nodes/CustomParagraphNode";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $getNearestBlockElementAncestorOrThrow } from "@lexical/utils";

function ParagraphNodeChangeListener() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterTest = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const caretNode = selection.anchor.getNode();
          const anchorNode = selection.anchor.getNode();
          const isParagraphNode = $isCustomParagraphNode(anchorNode);
          if (isParagraphNode) {
            const root = $getRoot();

            const paragraphNodes = root.getChildren().filter((node) => {
              return $isCustomParagraphNode(node);
            });
            const selectedNode =
              $getNearestBlockElementAncestorOrThrow(caretNode);

            paragraphNodes.forEach((node) => {
              if (node.isEmpty()) return;
              if (node.getKey() === selectedNode.getKey()) {
                node.updateFocusTest(true);
              } else {
                node.updateFocusTest(false);
              }
            });

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