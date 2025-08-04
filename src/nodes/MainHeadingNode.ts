import { HeadingNode, type SerializedHeadingNode } from "@lexical/rich-text";
import { $applyNodeReplacement, type LexicalNode, type NodeKey, type EditorConfig } from "lexical";

export class MainHeadingNode extends HeadingNode {
  static getType(): string {
    return "main-heading";
  }

  constructor(key?: NodeKey) {
    super("h1", key);
  }

  static clone(node: MainHeadingNode): MainHeadingNode {
    return new MainHeadingNode(node.__key);
  }

  // Bu elementi doma ilk koyuşumuzda bu event çalışıyor.
  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    // Class ekleme
    element.classList.add("main-heading");
    // Data attribute ekleme
    element.setAttribute("data-placeholder", "Başlık girin...");
    element.setAttribute("data-node-type", "main-heading");
    element.setAttribute("data-empty", "");
    return element;
  }

  updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
    const isUpdated = super.updateDOM(prevNode, dom, config);

    const isEmpty = this.isEmpty();

    if (isEmpty) {
      dom.setAttribute("data-empty", "");
    } else {
      dom.removeAttribute("data-empty");
    }

    return isUpdated;
  }

  exportJSON(): SerializedHeadingNode {
    return {
      ...super.exportJSON(),
      type: "main-heading",
    };
  }

  static importJSON(serializedNode: SerializedHeadingNode): MainHeadingNode {
    return new MainHeadingNode().updateFromJSON(serializedNode);
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
