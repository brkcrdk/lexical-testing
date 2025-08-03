import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  DELETE_WORD_COMMAND,
  DELETE_LINE_COMMAND,
  $isElementNode,
} from "lexical";
import { useEffect } from "react";
import { $isMainHeadingNode } from "../nodes/MainHeadingNode";

function HeadingRemove() {
  const [editor] = useLexicalComposerContext();

  // Main heading kontrolü için ortak fonksiyon
  const shouldPreventDeletion = () => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return false;
    }

    const anchorNode = selection.anchor.getNode();
    const anchorParent = anchorNode.getParent();

    // Main heading node'unu kontrol et
    if ($isMainHeadingNode(anchorParent)) {
      const textContent = anchorParent.getTextContent();

      // Seçili text var mı kontrol et
      const hasSelection = !selection.isCollapsed();

      // Eğer seçili text varsa, silmeye izin ver
      if (hasSelection) {
        return false;
      }

      // Eğer main heading boşsa ve cursor başta ise
      if (textContent.trim() === "" && selection.anchor.offset === 0) {
        return true;
      }

      // Eğer main heading'de text varsa ve cursor başta ise
      if (selection.anchor.offset === 0 && textContent.trim() !== "") {
        return true;
      }
    }

    // Root'ta sadece main heading varsa ve o da boşsa
    const root = $getRoot();
    const children = root.getChildren();

    if (children.length === 1 && $isMainHeadingNode(children[0])) {
      const textContent = children[0].getTextContent();
      if (textContent.trim() === "") {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    // Backspace komutu
    const backspaceCommand = editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      (payload) => {
        if (shouldPreventDeletion()) {
          payload.preventDefault();
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH
    );

    // Word silme komutu (Command + Backspace)
    const deleteWordCommand = editor.registerCommand(
      DELETE_WORD_COMMAND,
      (payload) => {
        if (shouldPreventDeletion()) {
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH
    );

    // Line silme komutu (Command + Shift + Backspace)
    const deleteLineCommand = editor.registerCommand(
      DELETE_LINE_COMMAND,
      (payload) => {
        if (shouldPreventDeletion()) {
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH
    );

    return () => {
      backspaceCommand();
      deleteWordCommand();
      deleteLineCommand();
    };
  }, [editor]);

  return null;
}

export default HeadingRemove;
