import {
  $applyNodeReplacement,
  ElementNode,
  type LexicalNode,
  type NodeKey,
  type SerializedElementNode,
} from "lexical";

export class MainHeadingNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType(): string {
    return "main-heading";
  }

  static clone(node: MainHeadingNode): MainHeadingNode {
    return new MainHeadingNode(node.__key);
  }

  static importJSON(serializedNode: SerializedElementNode): MainHeadingNode {
    return $createMainHeadingNode().updateFromJSON(serializedNode);
  }

  createDOM(): HTMLElement {
    const element = document.createElement("h1");
    element.setAttribute("data-node-type", "main-heading");
    element.setAttribute("data-placeholder", "Başlık girin...");

    const isEmpty = this.isEmpty();

    if (isEmpty) {
      element.setAttribute("data-empty", "");
    }

    return element;
  }

  updateDOM(prevNode: this, dom: HTMLElement): boolean {
    const wasEmpty = prevNode.isEmpty();
    const isEmpty = this.isEmpty();

    const currentDomHasEmptyAttr = dom.hasAttribute("data-empty");

    if (wasEmpty !== isEmpty || currentDomHasEmptyAttr !== isEmpty) {
      if (isEmpty) {
        dom.setAttribute("data-empty", "");
      } else {
        dom.removeAttribute("data-empty");
      }
      return true;
    }

    return false;
  }

  override isEmpty(): boolean {
    return super.isEmpty() && this.getTextContent().trim() === "";
  }
}

export function $createMainHeadingNode(): MainHeadingNode {
  return $applyNodeReplacement(new MainHeadingNode());
}

export function $isMainHeadingNode(
  node: LexicalNode | null | undefined
): node is MainHeadingNode {
  return node instanceof MainHeadingNode;
}
