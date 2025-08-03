import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_HIGH, KEY_BACKSPACE_COMMAND } from "lexical";
import { useEffect } from "react";
function HeadingRemove() {

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const backspaceCommand = editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      (payload) => {
        console.log(payload);
        return false
      },
      COMMAND_PRIORITY_HIGH
    );

    return () => {
      backspaceCommand();
    };
  }, [editor]);

  return null
}

export default HeadingRemove;