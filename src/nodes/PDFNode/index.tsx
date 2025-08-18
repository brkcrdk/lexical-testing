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

interface SerializedPdfNode extends SerializedDecoratorBlockNode {
  width: number;
  align: AlignTypes;
}

export class PdfNode extends DecoratorBlockNode {
  __width: number;
  __align: AlignTypes;
  static getType(): string {
    return "pdf";
  }

  static clone(node: PdfNode): PdfNode {
    return new PdfNode(node.__width, node.__align, node.__format, node.__key);
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

  static importJSON(serializedNode: SerializedPdfNode): PdfNode {
    return $createPdfNode(
      serializedNode.width,
      serializedNode.align
    ).updateFromJSON(serializedNode);
  }

  exportJSON(): SerializedPdfNode {
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

export function $createPdfNode(width?: number, align?: AlignTypes): PdfNode {
  return $applyNodeReplacement(new PdfNode(width, align));
}

export function $isPdfNode(
  node: PdfNode | LexicalNode | null | undefined
): node is PdfNode {
  return node instanceof PdfNode;
}
