import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { DRAG_DROP_PASTE } from "@lexical/rich-text";
import { isMimeType, mediaFileReader } from "@lexical/utils";
import { COMMAND_PRIORITY_LOW } from "lexical";
import { useCallback, useEffect } from "react";

// import { INSERT_IMAGE_COMMAND } from "../ImagesPlugin";
import { INSERT_PDF_COMMAND } from "./PdfPlugin";

const ACCEPTABLE_IMAGE_TYPES = [
  // "image/",
  // "image/heic",
  // "image/heif",
  // "image/gif",
  // "image/webp",
  "application/pdf",
];

function DragDropPastePlugin() {
  const [editor] = useLexicalComposerContext();


  const handleDragDropPaste =useCallback(async (files: File[]) => {
    const filesResult = await mediaFileReader(
      files,
      [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x)
    );

      for (const { file, result } of filesResult) {
        if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
          editor.dispatchCommand(INSERT_PDF_COMMAND, result);
        }
      }
  }, [editor]);

  useEffect(() => {
    const unregisterDragDropPaste = editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        handleDragDropPaste(files);
        return true;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      unregisterDragDropPaste();
    };
  }, [editor,handleDragDropPaste]);
  
  return null;
}
export default DragDropPastePlugin;