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
import type { AlignTypes } from "../../components/MediaNodeWrapper";

interface SerializedPDFNode extends SerializedDecoratorBlockNode {
  width: number;
  align: AlignTypes;
}

export class PDFNode extends DecoratorBlockNode {
  __width: number;
  __align: AlignTypes;
  static getType(): string {
    return "pdf";
  }

  static clone(node: PDFNode): PDFNode {
    return new PDFNode(node.__width, node.__align, node.__format, node.__key);
  }

  constructor(
    width: number = 50,
    align: AlignTypes = "start",
    format?: ElementFormatType,
    key?: NodeKey
  ) {
    super(format, key);
    this.__width = width;
    this.__align = align;
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedNode: SerializedPDFNode): PDFNode {
    return $createPDFNode(
      serializedNode.width,
      serializedNode.align
    ).updateFromJSON(serializedNode);
  }

  exportJSON(): SerializedPDFNode {
    return {
      ...super.exportJSON(),
      width: this.__width,
      align: this.__align,
    };
  }

  setWidth(width: number) {
    const writable = this.getWritable();
    writable.__width = width;
  }

  setAlign(align: AlignTypes) {
    const writable = this.getWritable();
    writable.__align = align;
  }

  decorate(editor: LexicalEditor, config: EditorConfig) {
    return <span>pdf block</span>;
  }
}

export function $createPDFNode(width?: number, align?: AlignTypes): PDFNode {
  return $applyNodeReplacement(new PDFNode(width, align));
}

export function $isPDFNode(
  node: PDFNode | LexicalNode | null | undefined
): node is PDFNode {
  return node instanceof PDFNode;
}
