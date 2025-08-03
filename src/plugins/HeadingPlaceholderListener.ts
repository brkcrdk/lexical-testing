import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { MainHeadingNode } from "../nodes/MainHeadingNode";
import { useEffect } from "react";

function HeadingPlaceholderListener() {
  const [editor] = useLexicalComposerContext();
  
  useEffect(() => {
    const mainHeadingTransform = editor.registerNodeTransform(
      MainHeadingNode,
      (mainHeadingNode) => {
        const isEmpty = mainHeadingNode.isEmpty();

        // mainHeadingNode.markDirty();

        // if(isEmpty){
        //   mainHeadingNode.setCustomStatus(true);
        // }else{
        //   mainHeadingNode.setCustomStatus(false);
        // }

        // mainHeadingNode.setCustomStatus(isEmpty);

        // const textContent = mainHeadingNode.getTextContent();
        // const children = mainHeadingNode.getChildren();

        // // MainHeading'in içeriği değiştiğinde
        // if (textContent.length > 0) {
        //   console.log("MainHeading içeriği:", textContent);

        //   // Merge durumunu tespit et
        //   if (children.length > 1) {
        //     console.log("MainHeading merge edildi!");
        //     // Event'i çalıştır
        //     // editor.dispatchCommand(YOUR_CUSTOM_COMMAND, null);
        //   }
        // }
      }
    );

    return () => {
      mainHeadingTransform();
    };
  }, [editor]);

  return null;
}

export default HeadingPlaceholderListener;