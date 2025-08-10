import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_LOW, DROP_COMMAND } from "lexical";

function OnDropPlugin() {
  const [editor] = useLexicalComposerContext();

   useEffect(() => {
     const unregisterDrop = editor.registerCommand(
       DROP_COMMAND,
       (payload) => {
         console.log(payload);
         return false;
       },
       COMMAND_PRIORITY_LOW
     );

     return () => {
       unregisterDrop();
     };
   }, [editor]);

   
  return null;
}

export default OnDropPlugin;