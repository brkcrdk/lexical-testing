import { $applyNodeReplacement, ElementNode, type EditorConfig, type LexicalEditor, type LexicalNode } from "lexical";

export class CollapsibleContentNode extends ElementNode {
  static getType() {
    return "collapsible-content";
  }

  static clone(node: CollapsibleContentNode): CollapsibleContentNode {
    return new CollapsibleContentNode(node.__key);
  }

  createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const element = document.createElement("div");
    element.setAttribute("data-node-type", "collapsible-content");
    return element;
  }

  updateDOM() {
    return false;
  }
}

export function $createCollapsibleContentNode(): CollapsibleContentNode {
  return $applyNodeReplacement(new CollapsibleContentNode());
}

export function $isCollapsibleContentNode(
  node: LexicalNode | null | undefined
): node is CollapsibleContentNode {
  return node instanceof CollapsibleContentNode;
}