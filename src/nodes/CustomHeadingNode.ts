import { HeadingNode, type HeadingTagType, type SerializedHeadingNode } from "@lexical/rich-text";
import {
  $applyNodeReplacement,
  type LexicalNode,
  type NodeKey,
  type EditorConfig,
} from "lexical";


const placeholderValues:Record<HeadingTagType,string> = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
}

export class CustomHeadingNode extends HeadingNode {
  static getType(): string {
    return "custom-heading";
  }

  constructor(tagType: HeadingTagType = "h1", key?: NodeKey) {
    super(tagType, key);
  }

  static clone(node: CustomHeadingNode): CustomHeadingNode {
    return new CustomHeadingNode(node.__tag, node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    const isEmpty = this.isEmpty();
  
    element.setAttribute("data-node-type", "custom-heading");
    element.setAttribute("data-placeholder", placeholderValues[this.__tag]);

    if (isEmpty) {
      element.setAttribute("data-empty", "");
    }
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
      type: "custom-heading",
    };
  }

  static importJSON(serializedNode: SerializedHeadingNode): CustomHeadingNode {
    return new CustomHeadingNode().updateFromJSON(serializedNode);
  }
}

export function $createCustomHeadingNode(tagType: HeadingTagType): CustomHeadingNode {
  return $applyNodeReplacement(new CustomHeadingNode(tagType));
}

export function $isCustomHeadingNode(
  node: LexicalNode | null | undefined
): node is CustomHeadingNode {
  return node instanceof CustomHeadingNode;
}
