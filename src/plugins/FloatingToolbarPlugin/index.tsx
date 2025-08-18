import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function FloatingToolbar() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [visible, setVisible] = useState(false);

  // Toolbar’ın pozisyonunu güncelle
  const updateToolbar = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      const toolbarElem = toolbarRef.current;

      if (!$isRangeSelection(selection) || selection.isCollapsed()) {
        setVisible(false);
        return;
      }

      // Format state güncelle
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      // DOM rect al
      const nativeSelection = window.getSelection();
      if (!nativeSelection || nativeSelection.rangeCount === 0) {
        setVisible(false);
        return;
      }
      const range = nativeSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (toolbarElem) {
        toolbarElem.style.top = `${rect.top - 70 + window.scrollY}px`;
        toolbarElem.style.left = `${rect.left + rect.width / 2}px`;
      }

      setVisible(true);
    });
  }, [editor]);

  // Lexical selection değiştiğinde toolbar güncelle
  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor, updateToolbar]);

  // Content güncellenince toolbar state güncelle
  useEffect(() => {
    return editor.registerUpdateListener(() => {
      updateToolbar();
    });
  }, [editor, updateToolbar]);

  if (!visible) return null;

  return createPortal(
    <div
      ref={toolbarRef}
      className="bg-black border rounded-md p-2 flex gap-2 z-50 absolute">
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        style={{ fontWeight: isBold ? "bold" : "normal" }}>
        B
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        style={{ fontStyle: isItalic ? "italic" : "normal" }}>
        I
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        style={{ textDecoration: isUnderline ? "underline" : "none" }}>
        U
      </button>
    </div>,
    document.getElementById("editor-content") || document.body
  );
}

export default function FloatingToolbarPlugin() {
  return <FloatingToolbar />;
}
