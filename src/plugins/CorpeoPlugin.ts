import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_EDITOR, createCommand, type LexicalCommand } from "lexical";
import { useEffect } from "react";
import { $createCorpeoNode } from "../nodes/CorpeoNode";
import { $insertNodeToNearestRoot } from "@lexical/utils";

export const INSERT_CORPEO_COMMAND: LexicalCommand<string> = createCommand(
  "INSERT_CORPEO_COMMAND"
);

function CorpeoPlugin(){
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    const unregisterCorpeoCommand = editor.registerCommand<string>(
      INSERT_CORPEO_COMMAND,
      (payload) => {
        const corpeoNode = $createCorpeoNode(payload);
        $insertNodeToNearestRoot(corpeoNode);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    return () => {
      unregisterCorpeoCommand();
    };
  }, [editor]);
  return null
}

export default CorpeoPlugin;