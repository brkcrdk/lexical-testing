import { ElementNode, type EditorConfig, type LexicalEditor, type LexicalNode, type NodeKey, type SerializedElementNode } from "lexical";

interface SerializedCollapsibleContainerNode extends SerializedElementNode {
  open: boolean;
}

export class CollapsibleContainerNode extends ElementNode {
  __open: boolean;

  constructor(open: boolean, key?: NodeKey) {
    super(key);
    this.__open = open;
  }
  static getType() {
    return "collapsible-container";
  }

  static clone(node: CollapsibleContainerNode): CollapsibleContainerNode {
    return new CollapsibleContainerNode(node.__open, node.__key);
  }

  createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const element = document.createElement("details");
    element.setAttribute("data-node-type", "collapsible-container");
    return element;
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }

  static importJSON(
    serializedNode: SerializedCollapsibleContainerNode
  ): CollapsibleContainerNode {
    return $createCollapsibleContainerNode(serializedNode.open).updateFromJSON(
      serializedNode
    );
  }

  exportJSON(): SerializedCollapsibleContainerNode {
    return {
      ...super.exportJSON(),
      open: this.__open,
    };
  }
  
  isShadowRoot() {
    return true;
  }
}

export function $createCollapsibleContainerNode(
  isOpen: boolean
): CollapsibleContainerNode {
  return new CollapsibleContainerNode(isOpen);
}

export function $isCollapsibleContainerNode(
  node: LexicalNode | null | undefined
): node is CollapsibleContainerNode {
  return node instanceof CollapsibleContainerNode;
}