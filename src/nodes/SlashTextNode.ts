import type {
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
} from "lexical";

import { TextNode } from "lexical";

export class SlashBadgeNode extends TextNode {
  constructor(text: string, key?: NodeKey) {
    super(text, key);
  }
  static getType() {
    return "slash-badge";
  }

  static clone(node: SlashBadgeNode): SlashBadgeNode {
    return new SlashBadgeNode(node.__text, node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);

    dom.setAttribute("data-node-type", "slash-placeholder");
    dom.setAttribute("data-placeholder", "Filter here...");
    dom.classList.add("slash-placeholder");
    return dom;
  }

  updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    return isUpdated;
  }

  static importJSON(serializedNode: SerializedTextNode): SlashBadgeNode {
    return $createSlashBadgeNode(serializedNode.text).updateFromJSON(
      serializedNode
    );
  }

  exportJSON(): SerializedTextNode {
    return {
      ...super.exportJSON(),
    };
  }
}

export function $createSlashBadgeNode(text: string): SlashBadgeNode {
  return new SlashBadgeNode(text);
}

export function $isSlashBadgeNode(
  node: LexicalNode | null | undefined
): node is SlashBadgeNode {
  return node instanceof SlashBadgeNode;
}

