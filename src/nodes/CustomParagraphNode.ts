
import {
  $applyNodeReplacement,
  type EditorConfig,
  type LexicalNode,
  ParagraphNode,
  type SerializedParagraphNode,
} from "lexical";

export class CustomParagraphNode extends ParagraphNode {
  static getType() {
    return "custom-paragraph";
  }
  static clone(node: CustomParagraphNode): CustomParagraphNode {
    return new CustomParagraphNode(node.__key);
  }
  static importJSON(json: SerializedParagraphNode): CustomParagraphNode {
    return $createCustomParagraphNode().updateFromJSON(json);
  }
  createDOM(config: EditorConfig) {
    const el = super.createDOM(config);
    el.setAttribute("data-placeholder", "Paragraf girin...");
    el.setAttribute("data-node-type", "custom-paragraph");
    el.setAttribute("data-empty", "");
    return el;
  }

  // Bu event sadece dom değiştiğinde çalışır. Amacımız block içerği boş olduğu zaman güncellemek ve data attributelarını güncellemek.
  updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    const isEmpty = prevNode.isEmpty();

    if (isEmpty) {
      dom.setAttribute("data-empty", "");
    } else {
      dom.removeAttribute("data-empty");
    }
    return isUpdated;
  }
}

export function $createCustomParagraphNode() {
  return $applyNodeReplacement(new CustomParagraphNode());
}

export function $isCustomParagraphNode(
  node: LexicalNode | null | undefined
): node is CustomParagraphNode {
  return node instanceof CustomParagraphNode;
}