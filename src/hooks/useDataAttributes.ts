import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  setDataAttributeOnSelection,
  removeDataAttributeFromSelection,
  setDataAttributeOnNode,
  removeDataAttributeFromNode,
} from "../utils/dataAttributeUtils";

export function useDataAttributes() {
  const [editor] = useLexicalComposerContext();

  const setAttributeOnSelection = (key: string, value: string | boolean) => {
    setDataAttributeOnSelection(editor, key, value);
  };

  const removeAttributeFromSelection = (key: string) => {
    removeDataAttributeFromSelection(editor, key);
  };

  const setAttributeOnNode = (
    nodeKey: string,
    key: string,
    value: string | boolean
  ) => {
    setDataAttributeOnNode(editor, nodeKey, key, value);
  };

  const removeAttributeFromNode = (nodeKey: string, key: string) => {
    removeDataAttributeFromNode(editor, nodeKey, key);
  };

  const setMultipleAttributesOnSelection = (
    attributes: Record<string, string | boolean>
  ) => {
    Object.entries(attributes).forEach(([key, value]) => {
      setDataAttributeOnSelection(editor, key, value);
    });
  };

  const removeMultipleAttributesFromSelection = (keys: string[]) => {
    keys.forEach((key) => {
      removeDataAttributeFromSelection(editor, key);
    });
  };

  return {
    setAttributeOnSelection,
    removeAttributeFromSelection,
    setAttributeOnNode,
    removeAttributeFromNode,

    setMultipleAttributesOnSelection,
    removeMultipleAttributesFromSelection,

    setHighlighted: (highlighted: boolean = true) =>
      setAttributeOnSelection("highlighted", highlighted),
    setPriority: (priority: "low" | "medium" | "high") =>
      setAttributeOnSelection("priority", priority),
    setStatus: (status: "draft" | "review" | "published") =>
      setAttributeOnSelection("status", status),
    setFocus: (focused: boolean = true) =>
      setAttributeOnSelection("has-focus", focused),

    removeHighlighted: () => removeAttributeFromSelection("highlighted"),
    removePriority: () => removeAttributeFromSelection("priority"),
    removeStatus: () => removeAttributeFromSelection("status"),
    removeFocus: () => removeAttributeFromSelection("has-focus"),
  };
}
