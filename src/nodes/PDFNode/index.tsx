import {
  DecoratorBlockNode,
  type SerializedDecoratorBlockNode,
} from "@lexical/react/LexicalDecoratorBlockNode";
import {
  $applyNodeReplacement,
  type EditorConfig,
  type ElementFormatType,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
} from "lexical";

import PdfComponent from "./PdfComponent";

interface SerializedPdfNode extends SerializedDecoratorBlockNode {
  fileUrl?: string;
}

export class PdfNode extends DecoratorBlockNode {
  __fileUrl?: string;

  static getType(): string {
    return "pdf";
  }

  static clone(node: PdfNode): PdfNode {
    return new PdfNode(node.__fileUrl, node.__format, node.__key);
  }

  constructor(fileUrl?: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__fileUrl = fileUrl;
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedNode: SerializedPdfNode): PdfNode {
    return $createPdfNode().updateFromJSON(serializedNode);
  }

  exportJSON(): SerializedPdfNode {
    return {
      ...super.exportJSON(),
      fileUrl: this.__fileUrl,
    };
  }

  decorate(editor: LexicalEditor, config: EditorConfig) {
    return <PdfComponent fileUrl={this.__fileUrl} />;
  }
}

export function $createPdfNode(fileUrl?: string): PdfNode {
  return $applyNodeReplacement(new PdfNode(fileUrl));
}

export function $isPdfNode(
  node: PdfNode | LexicalNode | null | undefined
): node is PdfNode {
  return node instanceof PdfNode;
}
