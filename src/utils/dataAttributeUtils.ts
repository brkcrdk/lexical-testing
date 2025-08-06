import type { LexicalEditor } from "lexical";
import { $getSelection, $isRangeSelection } from "lexical";

export function setDataAttributeOnSelection(
  editor: LexicalEditor,
  key: string,
  value: string | boolean
): void {
  editor.update(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const nodes = selection.getNodes();

      nodes.forEach((node) => {
        const domElement = editor.getElementByKey(node.getKey());
        if (domElement) {
          applyDataAttribute(domElement, key, value);
        }

        const parent = node.getParent();
        if (parent) {
          const parentDomElement = editor.getElementByKey(parent.getKey());
          if (parentDomElement) {
            applyDataAttribute(parentDomElement, key, value);
          }
        }
      });
    }
  });
}

export function removeDataAttributeFromSelection(
  editor: LexicalEditor,
  key: string
): void {
  editor.update(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const nodes = selection.getNodes();

      nodes.forEach((node) => {
        const domElement = editor.getElementByKey(node.getKey());
        if (domElement) {
          const attrName = `data-${key}`;
          domElement.removeAttribute(attrName);
        }

        const parent = node.getParent();
        if (parent) {
          const parentDomElement = editor.getElementByKey(parent.getKey());
          if (parentDomElement) {
            const attrName = `data-${key}`;
            parentDomElement.removeAttribute(attrName);
          }
        }
      });
    }
  });
}

function applyDataAttribute(
  element: HTMLElement,
  key: string,
  value: string | boolean
): void {
  const attrName = `data-${key}`;

  if (typeof value === "boolean") {
    if (value) {
      element.setAttribute(attrName, "");
    } else {
      element.removeAttribute(attrName);
    }
  } else {
    element.setAttribute(attrName, value);
  }
}

export function setDataAttributeOnNode(
  editor: LexicalEditor,
  nodeKey: string,
  key: string,
  value: string | boolean
): void {
  const domElement = editor.getElementByKey(nodeKey);
  if (domElement) {
    applyDataAttribute(domElement, key, value);
  }
}

export function removeDataAttributeFromNode(
  editor: LexicalEditor,
  nodeKey: string,
  key: string
): void {
  const domElement = editor.getElementByKey(nodeKey);
  if (domElement) {
    const attrName = `data-${key}`;
    domElement.removeAttribute(attrName);
  }
}
