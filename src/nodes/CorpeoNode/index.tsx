import {
  DecoratorBlockNode,
  type SerializedDecoratorBlockNode,
} from "@lexical/react/LexicalDecoratorBlockNode";

import type {
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
} from "lexical";

import CorpeoComponent from "./CorpeoComponent";

interface SerializedCorpeoNode extends SerializedDecoratorBlockNode {
  hashCode: string;
  width: number;
}

export class CorpeoNode extends DecoratorBlockNode {
  __hashCode: string;
  __width: number;

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
    key?: NodeKey
  ) {
    super(format, key);
    this.__hashCode = hashCode;
    this.__width = width;
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedNode: SerializedCorpeoNode): CorpeoNode {
    return $createCorpeoNode(
      serializedNode.hashCode,
      serializedNode.width
    ).updateFromJSON(serializedNode);
  }

  exportJSON(): SerializedCorpeoNode {
    return {
      ...super.exportJSON(),
      hashCode: this.__hashCode,
      width: this.__width,
    };
  }


  decorate(_editor: LexicalEditor, config: EditorConfig) {
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
    return <CorpeoComponent hashCode={this.__hashCode} width={this.__width} />;
  }
}

export function $createCorpeoNode(
  hashCode: string,
  width?: number
): CorpeoNode {
  return new CorpeoNode(hashCode, width);
}

export function $isCorpeoNode(
  node: CorpeoNode | LexicalNode | null | undefined
): node is CorpeoNode {
  return node instanceof CorpeoNode;
}
