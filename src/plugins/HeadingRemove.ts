import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  KEY_BACKSPACE_COMMAND,
  DELETE_WORD_COMMAND,
  DELETE_LINE_COMMAND,
  DELETE_CHARACTER_COMMAND,
} from "lexical";
import { useEffect } from "react";
import { $isMainHeadingNode } from "../nodes/MainHeadingNode";

function HeadingRemove() {
  const [editor] = useLexicalComposerContext();

  // Main heading kontrolü için ortak fonksiyon
  const shouldPreventDeletion = (): boolean => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return false;
    }

    const anchorNode = selection.anchor.getNode();
    const anchorParent = anchorNode.getParent();

    if ($isMainHeadingNode(anchorParent)) {
      const isEmpty = anchorParent.isEmpty();
      // if (selection.anchor.offset === 0 && textContent.trim().length === 0) {
      //   return true;
      // }

      // Eğer main heading boşsa ve cursor başta ise
      if (isEmpty && selection.anchor.offset === 0) {
        return true;
      }

      // Eğer main heading'de text varsa ve cursor başta ise
      if (selection.anchor.offset === 0 && !isEmpty) {
        return true;
      }

      return false;
    }

    // // Main heading node'unu kontrol et
    // if ($isMainHeadingNode(anchorParent)) {
    //   const textContent = anchorParent.getTextContent();

    //   // Seçili text var mı kontrol et
    //   const hasSelection = !selection.isCollapsed();

    //   // Eğer seçili text varsa, silmeye izin ver
    //   if (hasSelection) {
    //     // Seçili olan text, tüm başlığa eşitse, başlığı temizle veya boş stringe ata
    //     return false;
    //   }

    //   // Eğer main heading boşsa ve cursor başta ise
    //   if (textContent.trim() === "" && selection.anchor.offset === 0) {
    //     return true;
    //   }

    //   // Eğer main heading'de text varsa ve cursor başta ise
    //   if (selection.anchor.offset === 0 && textContent.trim() !== "") {
    //     return true;
    //   }
    // }

    // // Root'ta sadece main heading varsa ve o da boşsa
    // const root = $getRoot();
    // const children = root.getChildren();

    // if (children.length === 1 && $isMainHeadingNode(children[0])) {
    //   const textContent = children[0].getTextContent();
    //   if (textContent.trim() === "") {
    //     return true;
    //   }
    // }

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
      () => {
        if (shouldPreventDeletion()) {
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH
    );
    // Word silme komutu (Command + Backspace)
    const deleteCharacter = editor.registerCommand(
      DELETE_CHARACTER_COMMAND,
      () => {
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
      () => {
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
      deleteCharacter();
      deleteLineCommand();
    };
  }, [editor]);

  return null;
}

export default HeadingRemove;
