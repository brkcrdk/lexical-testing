import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  KEY_BACKSPACE_COMMAND,
} from "lexical";
import { useEffect } from "react";
import { $isMainHeadingNode } from "../nodes/MainHeadingNode";
function HeadingRemove() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const backspaceCommand = editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      (payload) => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          return false;
        }

        const anchorNode = selection.anchor.getNode().getParent();

        const isMainHeading = $isMainHeadingNode(anchorNode);

        if (selection.anchor.offset === 0 && isMainHeading) {
          payload.preventDefault();
          return true;
        }

        if (anchorNode?.getTextContent().trim() === "") {
          payload.preventDefault();
          return true;
        }

        return false;
      },
      COMMAND_PRIORITY_HIGH
    );

    return () => {
      backspaceCommand();
    };
  }, [editor]);

  return null;
}

export default HeadingRemove;