import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $isCustomParagraphNode } from "../nodes/CustomParagraphNode";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, SELECTION_CHANGE_COMMAND } from "lexical";

function ParagraphNodeChangeListener() {
  const [editor] = useLexicalComposerContext();

  
  useEffect(()=>{
    // const unregisterUpdateListener = editor.registerMutationListener(
    //   CustomParagraphNode,
    //   (mutatedNodes) => {
    //     for (const [key, mutation] of mutatedNodes) {
    //       if (mutation === "updated") {
    //         // const node = editor.getEditorState().toJSON();
    //         console.log("ParagraphNode created",key);
    //         // console.log(node);
    //       }
    //     }
    //   }
    // );

    const unregisterTest = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const isParagraphNode = $isCustomParagraphNode(anchorNode);

          if(isParagraphNode){
            anchorNode.updateFocusTest();
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
  },[editor])


  return null;
}

export default ParagraphNodeChangeListener;