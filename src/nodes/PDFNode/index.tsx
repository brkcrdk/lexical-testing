import {
  DecoratorBlockNode,
  type SerializedDecoratorBlockNode,
} from "@lexical/react/LexicalDecoratorBlockNode";
import {
  $applyNodeReplacement,
  type ElementFormatType,
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
  activePage: number;
  scale: number;
  totalPage: number;
}
export class PdfNode extends DecoratorBlockNode {
  __fileUrl?: string;
  __pageMetadata: PageMetadata[];
  __activePage: number; // Hangi sayfa aktif
  __scale: number; // Zoom seviyesi
  __totalPage: number; // Toplam sayfa sayısı

  static getType(): string {
    return "pdf";
  }

  static clone(node: PdfNode): PdfNode {
    return new PdfNode(
      node.__fileUrl,
      node.__pageMetadata,
      node.__activePage,
      node.__totalPage,
      node.__scale,
      node.__format,
      node.__key
    );
  }

  constructor(
    fileUrl?: string,
    pageMetadata?: PageMetadata[],
    activePage?: number,
    totalPage?: number,
    scale?: number,
    format?: ElementFormatType,
    key?: NodeKey
  ) {
    super(format, key);
    this.__fileUrl = fileUrl;
    this.__pageMetadata = pageMetadata || [];
    this.__activePage = activePage || 1;
    this.__totalPage = totalPage || 1;
    this.__scale = scale || 1;
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

  setTotalPage(totalPage: number) {
    const writable = this.getWritable();
    writable.__totalPage = totalPage;
  }

  setActivePage(activePage: number) {
    const writable = this.getWritable();
    writable.__activePage = activePage;
  }

  handleIncreaseScale() {
    const writable = this.getWritable();
    if (writable.__scale < 2) {
      writable.__scale = writable.__scale + 0.1;
    }
  }
  handleDecreaseScale() {
    const writable = this.getWritable();
    if (writable.__scale > 0.5) {
      writable.__scale = writable.__scale - 0.1;
    }
  }

  handleGoNextPage() {
    const writable = this.getWritable();
    if (writable.__activePage < writable.__totalPage) {
      writable.__activePage = writable.__activePage + 1;
    }
  }

  handleGoPrevPage() {
    const writable = this.getWritable();
    if (writable.__activePage > 1) {
      writable.__activePage = writable.__activePage - 1;
    }
  }

  handleGoToPage(page: number) {
    const writable = this.getWritable();
    writable.__activePage = page;
  }

  static importJSON(serializedNode: SerializedPdfNode): PdfNode {
    return $createPdfNode().updateFromJSON(serializedNode);
  }

  exportJSON(): SerializedPdfNode {
    return {
      ...super.exportJSON(),
      fileUrl: this.__fileUrl,
      pageMetadata: this.__pageMetadata,
      activePage: this.__activePage,
      scale: this.__scale,
      totalPage: this.__totalPage,
    };
  }

  decorate() {
    return (
      <PdfComponent
        fileUrl={this.__fileUrl}
        nodeKey={this.getKey()}
        pageMetadata={this.__pageMetadata}
        activePage={this.__activePage}
        totalPage={this.__totalPage}
        scale={this.__scale}
      />
    );
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
