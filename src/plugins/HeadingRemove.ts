import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { useEffect } from "react";
import {
  $createMainHeadingNode,
  MainHeadingNode,
} from "../nodes/MainHeadingNode";

function HeadingRemove() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const mutationTest = editor.registerMutationListener(
      MainHeadingNode,
      (mutatedNodes) => {
        for (const [_, mutation] of mutatedNodes) {
          if (mutation === "destroyed") {
            editor.update(() => {
              const node = $createMainHeadingNode();
              $insertNodes([node]);
            });
          }
        }
      },
      { skipInitialization: true }
    );

    return () => {
      mutationTest();
    };
  }, [editor]);

  return null;
}

export default HeadingRemove;
