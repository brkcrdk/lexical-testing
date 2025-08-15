import { $applyNodeReplacement, ElementNode, type EditorConfig, type LexicalEditor, type LexicalNode } from "lexical";

export class CollapsibleTitleNode extends ElementNode {
  static getType() {
    return "collapsible-title";
  }

  static clone(node: CollapsibleTitleNode): CollapsibleTitleNode {
    return new CollapsibleTitleNode(node.__key);
  }

  createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const element = document.createElement("summary");
    element.setAttribute("data-node-type", "collapsible-title");
    return element;
  }
  updateDOM() {
    return false;
  }
}

export function $createCollapsibleTitleNode(): CollapsibleTitleNode {
  return $applyNodeReplacement(new CollapsibleTitleNode());
}

export function $isCollapsibleTitleNode(
  node: LexicalNode | null | undefined
): node is CollapsibleTitleNode {
  return node instanceof CollapsibleTitleNode;
}
