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

import CorpeoComponent from "./CorpeoComponent";
import type { AlignTypes } from "../../components/MediaNodeWrapper";

interface SerializedCorpeoNode extends SerializedDecoratorBlockNode {
  hashCode: string;
  width: number;
  align: AlignTypes;
}

export class CorpeoNode extends DecoratorBlockNode {
  __hashCode: string;
  __width: number;
  __align: AlignTypes;
  static getType(): string {
    return "corpeo";
  }

  static clone(node: CorpeoNode): CorpeoNode {
    return new CorpeoNode(
      node.__hashCode,
      node.__width,
      node.__align,
      node.__format,
      node.__key
    );
  }

  constructor(
    hashCode: string,
    width: number = 50,
    align: AlignTypes = "start",
    format?: ElementFormatType,
    key?: NodeKey
  ) {
    super(format, key);
    this.__hashCode = hashCode;
    this.__width = width;
    this.__align = align;
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedNode: SerializedCorpeoNode): CorpeoNode {
    return $createCorpeoNode(
      serializedNode.hashCode,
      serializedNode.width,
      serializedNode.align
    ).updateFromJSON(serializedNode);
  }

  exportJSON(): SerializedCorpeoNode {
    return {
      ...super.exportJSON(),
      hashCode: this.__hashCode,
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

  setHashCode(hashCode: string) {
    const writable = this.getWritable();
    writable.__hashCode = hashCode;
  }

  decorate(editor: LexicalEditor, config: EditorConfig) {
    return (
      <CorpeoComponent
        hashCode={this.__hashCode}
        width={this.__width}
        align={this.__align}
        onResize={(width) => {
          editor.update(() => {
            this.setWidth(width);
          });
        }}
        onAlignChange={(align) => {
          editor.update(() => {
            this.setAlign(align);
          });
        }}
        onSelect={(hashCode) => {
          editor.update(() => {
            this.setHashCode(hashCode);
          });
        }}
      />
    );
  }
}

export function $createCorpeoNode(
  hashCode: string,
  width?: number,
  align?: AlignTypes
): CorpeoNode {
  return $applyNodeReplacement(new CorpeoNode(hashCode, width, align));
}

export function $isCorpeoNode(
  node: CorpeoNode | LexicalNode | null | undefined
): node is CorpeoNode {
  return node instanceof CorpeoNode;
}
