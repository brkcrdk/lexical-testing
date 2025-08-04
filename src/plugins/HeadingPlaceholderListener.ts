import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isMainHeadingNode } from "../nodes/MainHeadingNode";
import { useEffect } from "react";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  DELETE_CHARACTER_COMMAND,
} from "lexical";

function HeadingPlaceholderListener() {
  const [editor] = useLexicalComposerContext();

  /**
   * Main-heading ile bir sonraki child mergelenirken text olup olmadığı durumu updateDom tarafından yakalanamıdığı
   * için bu event ile yakalayıp manuel olarak updateDom'u tetikliyoruz.
   */
  useEffect(() => {
    const mainHeadingTransform = editor.registerCommand(
      DELETE_CHARACTER_COMMAND,
      (payload) => {
        /**
         * Silme işlemi geriye doğru yapıldığı için bu duruma bakıyoruz.
         * @bkz https://github.com/facebook/lexical/blob/main/packages/lexical/src/LexicalCommands.ts#L31
         */
        if (payload === false) {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();

            if ($isMainHeadingNode(anchorNode)) {
              const nextSibling = anchorNode.getNextSibling();
              const isEmpty = anchorNode.isEmpty();

              if (nextSibling && isEmpty) {
                console.log("first");
                anchorNode.markDirty();
                // anchorNode.setCustomStatus(false);
                // anchorNode.setEmptyStatus(false);
                // console.log("time to merghe");
                // editor.update(() => {
                //   anchorNode.markDirty();
                // });
                // anchorNode.markDirty();
              }
            }
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      mainHeadingTransform();
    };
  }, [editor]);

  return null;
}

export default HeadingPlaceholderListener;