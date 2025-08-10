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
    const isEmpty = this.isEmpty();

    el.setAttribute("data-node-type", "custom-paragraph");
    el.setAttribute("data-placeholder", "Yazın, '/' ile komutları kullanın...");

    if (this.__hasFocus) {
      el.setAttribute("data-focus", "");
    }

    if (isEmpty) {
      el.setAttribute("data-empty", "");
    }
    return el;
  }

  /**
   * Bu event sadece dom değiştiğinde çalışır. Amacımız block içerği boş olduğu zaman güncellemek ve data attributelarını güncellemek.
   */
  updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig) {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    const isEmpty = this.isEmpty();

    if (this.__hasFocus) {
      dom.setAttribute("data-focus", "");
    } else {
      dom.removeAttribute("data-focus");
    }

    if (isEmpty) {
      dom.setAttribute("data-empty", "");
    } else {
      dom.removeAttribute("data-empty");
    }
    return isUpdated;
  }

  updateFocusTest(newValue: boolean) {
    const self = this.getWritable();

    if (newValue !== self.__hasFocus) {
      self.__hasFocus = newValue;
      self.markDirty();
    }

    return self;
  }
}

export function $createCustomParagraphNode(hasFocus?: boolean) {
  return $applyNodeReplacement(new CustomParagraphNode(hasFocus));
}

export function $isCustomParagraphNode(
  node: LexicalNode | null | undefined
): node is CustomParagraphNode {
  return node instanceof CustomParagraphNode;
}
