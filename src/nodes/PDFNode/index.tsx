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

export interface PageMetadata {
  pageNumber: number;
  pageName: string;
  readingTime: number; // dakika cinsinden
}

interface SerializedPdfNode extends SerializedDecoratorBlockNode {
  fileUrl?: string;
  pageMetadata?: PageMetadata[];
}

export class PdfNode extends DecoratorBlockNode {
  __fileUrl?: string;
  __pageMetadata: PageMetadata[];

  static getType(): string {
    return "pdf";
  }

  static clone(node: PdfNode): PdfNode {
    return new PdfNode(
      node.__fileUrl,
      node.__pageMetadata,
      node.__format,
      node.__key
    );
  }

  constructor(
    fileUrl?: string,
    pageMetadata?: PageMetadata[],
    format?: ElementFormatType,
    key?: NodeKey
  ) {
    super(format, key);
    this.__fileUrl = fileUrl;
    this.__pageMetadata = pageMetadata || [];
  }

  updateDOM(): false {
    return false;
  }

  setFileUrl(fileUrl: string) {
    const writable = this.getWritable();
    writable.__fileUrl = fileUrl;
  }

  setPageMetadata(pageMetadata: PageMetadata[]) {
    const writable = this.getWritable();
    writable.__pageMetadata = pageMetadata;
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
    return (
      <PdfComponent
        fileUrl={this.__fileUrl}
        nodeKey={this.getKey()}
        pageMetadata={this.__pageMetadata}
      />
    );
  }
}

export function $createPdfNode(
  fileUrl?: string,
  pageMetadata?: PageMetadata[]
): PdfNode {
  return $applyNodeReplacement(new PdfNode(fileUrl, pageMetadata));
}

export function $isPdfNode(
  node: PdfNode | LexicalNode | null | undefined
): node is PdfNode {
  return node instanceof PdfNode;
}
