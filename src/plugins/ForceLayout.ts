import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { useEffect } from "react";
import {
  $createMainHeadingNode,
  MainHeadingNode,
} from "../nodes/MainHeadingNode";

/**
 * Bu plugin, editörde en az 1 tane H1 tagi olmasını sağlar. Bu tag sayfanın en başında yer alır.
 * Diğer H1 taglerinden ayrı olarak stili de farklıdır. Bu tagin üstünde de başka bir tag bulunmasını 
 * önler.
 */
function ForceLayout() {
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

export default ForceLayout;
