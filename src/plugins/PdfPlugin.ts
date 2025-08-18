import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  type LexicalCommand,
} from "lexical";
import { useEffect } from "react";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import { $createPdfNode } from "../nodes/PdfNode";

// Payload olarak bir şey gerekmediği için LexicalCommand typeına undefined parametre belirtiyoruz.
export const INSERT_PDF_COMMAND: LexicalCommand<undefined> = createCommand(
  "INSERT_PDF_COMMAND"
);

function PdfPlugin() {
  const [editor] = useLexicalComposerContext();
  
  useEffect(() => {
    const unregisterPdfCommand = editor.registerCommand(
      INSERT_PDF_COMMAND,
      () => {
        const pdfNode = $createPdfNode();
        $insertNodeToNearestRoot(pdfNode);
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    return () => {
      unregisterPdfCommand();
    };
  }, [editor]);
  return null;
}

export default PdfPlugin;
