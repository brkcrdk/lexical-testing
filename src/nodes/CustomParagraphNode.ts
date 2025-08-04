import {
  $applyNodeReplacement,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  ParagraphNode,
  type SerializedParagraphNode,
} from "lexical";

export class CustomParagraphNode extends ParagraphNode {
  __hasFocus: boolean;

  constructor(hasFocus = false, key?: NodeKey) {
    super(key);
    this.__hasFocus = hasFocus;
  }

  static getType() {
    return "custom-paragraph";
  }

  static clone(node: CustomParagraphNode): CustomParagraphNode {
    return new CustomParagraphNode(node.__hasFocus, node.__key);
  }

  static importJSON(json: SerializedParagraphNode): CustomParagraphNode {
    return $createCustomParagraphNode().updateFromJSON(json);
  }
  createDOM(config: EditorConfig) {
    const el = super.createDOM(config);
    el.setAttribute("data-node-type", "custom-paragraph");
    el.setAttribute("data-placeholder", "Paragraf girin...");

    if (this.__hasFocus) {
      el.setAttribute("data-has-focus", "");
    }

    if (this.isEmpty()) {
      el.setAttribute("data-empty", "");
    } else {
      el.removeAttribute("data-empty");
    }
    return el;
  }

  // Bu event sadece dom değiştiğinde çalışır. Amacımız block içerği boş olduğu zaman güncellemek ve data attributelarını güncellemek.
  updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig) {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    const isEmpty = this.isEmpty();

    if (isEmpty) {
      dom.setAttribute("data-empty", "");
    } else {
      dom.removeAttribute("data-empty");
    }
    return isUpdated;
  }

  updateFocusTest() {
    console.log("updateFocusTest");
    const self = this.getWritable();
    self.__hasFocus = true;
    return self;
  }
}

export function $createCustomParagraphNode(hasFocus = false) {
  return $applyNodeReplacement(new CustomParagraphNode(hasFocus));
}

export function $isCustomParagraphNode(
  node: LexicalNode | null | undefined
): node is CustomParagraphNode {
  return node instanceof CustomParagraphNode;
}
