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
      node.__format,
      node.__key
    );
  }

  constructor(
    hashCode: string,
    width: number = 50,
    format?: ElementFormatType,
    key?: NodeKey,
    align: AlignTypes = "left"
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

  setWidth(width: number): void {
    const writable = this.getWritable();
    writable.__width = width;
  }

  setAlign(align: AlignTypes): void {
    const writable = this.getWritable();
    writable.__align = align;
  }

  decorate(editor: LexicalEditor, config: EditorConfig) {
    // const embedBlockTheme = config.theme.embedBlock || {};
    // const className = {
    //   base: embedBlockTheme.base || '',
    //   focus: embedBlockTheme.focus || '',
    // };
    // return (
    //   <YouTubeComponent
    //     className={className}
    //     format={this.__format}
    //     nodeKey={this.getKey()}
    //     videoID={this.__id}
    //   />
    // );
    return (
      <CorpeoComponent
        hashCode={this.__hashCode}
        width={this.__width}
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
