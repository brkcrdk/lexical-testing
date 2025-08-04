import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  INSERT_LINE_BREAK_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
} from "lexical";
import { useEffect } from "react";
import {
  $createMainHeadingNode,
  $isMainHeadingNode,
  MainHeadingNode,
} from "../nodes/MainHeadingNode";

/**
 * Bu plugin, editörde en az 1 tane H1 tagi olmasını sağlar. Bu tag sayfanın en başında yer alır.
 * Diğer H1 taglerinden ayrı olarak stili de farklıdır. Bu tagin üstünde de başka bir tag bulunmasını 
 * önler.
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

        if($isRangeSelection(selection)) {
         const anchorNode = selection.anchor.getNode();
         const anchorParent = anchorNode.getParent();

          if($isMainHeadingNode(anchorParent) || selection.anchor.offset === 0) {
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


  // useEffect(() => {
  //   const unregisterEnterPressCommand = editor.registerCommand(
  //     KEY_ENTER_COMMAND,
  //     () => {
  //       const selection = $getSelection();
  //       console.log(selection);

  //       if($isRangeSelection(selection)) {
  //         const anchorNode = selection.anchor.getNode();
  //         const anchorParent = anchorNode.getParent();
  //         // if($isMainHeadingNode(anchorParent) && selection.anchor.offset === 0) {
  //         //   return true;
  //         // }
  //       }
  //       return false;
  //     },
  //     COMMAND_PRIORITY_LOW
  //   );

  //   return () => {
  //     unregisterEnterPressCommand();
  //   };
  // }, [editor]);

  useEffect(() => {
    const unregisterEnterPressCommand = editor.registerCommand(
      INSERT_PARAGRAPH_COMMAND,
      () => {
        const selection = $getSelection();
        console.log(selection);

        if($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const anchorParent = anchorNode.getParent();
          if($isMainHeadingNode(anchorParent) && selection.anchor.offset === 0) {
            return true;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      unregisterEnterPressCommand();
    };
  }, [editor]);

  useEffect(() => {
    const unregisterMutationListener = editor.registerMutationListener(
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
      unregisterMutationListener();
    };
  }, [editor]);

  return null;
}

export default MainHeadingPlugin;
