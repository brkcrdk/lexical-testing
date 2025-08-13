import type {
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  NodeKey,
  SerializedTextNode,
  Spread,
} from "lexical";

import { TextNode } from "lexical";


export class SlashBadgeNode extends TextNode {
  static clone(node: SlashBadgeNode): SlashBadgeNode {
    return new SlashBadgeNode(node.__text, node.__key);
  }

  static getType(): "slash-badge" {
    return "slash-badge";
  }

  static importDOM() {
    // Never import from DOM
    return null;
  }

  static importJSON(serializedNode: SerializedTextNode): SlashBadgeNode {
    return $createSlashBadgeNode(
      serializedNode.text,
    ).updateFromJSON(serializedNode);
  }

  exportJSON(): SerializedTextNode {
    return {
      ...super.exportJSON(),
    };
  }

  constructor(text: string, key?: NodeKey) {
    super(text, key);
  }

  updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
    return false;
  }

  exportDOM(_: LexicalEditor): DOMExportOutput {
    return { element: null };
  }

  excludeFromCopy() {
    return true;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    dom.classList.add(config.theme.autocomplete);
    return dom;
  }
}

export function $createSlashBadgeNode(text: string): SlashBadgeNode {
  return new SlashBadgeNode(text);
}
