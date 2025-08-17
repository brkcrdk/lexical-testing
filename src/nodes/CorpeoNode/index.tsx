import {
  DecoratorBlockNode,
  type SerializedDecoratorBlockNode,
} from "@lexical/react/LexicalDecoratorBlockNode";
import type {
  DOMExportOutput,
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
} from "lexical";
import CorpeoComponent from "./CorpeoComponent";

interface SerializedCorpeoNode extends SerializedDecoratorBlockNode {
  hashCode: string;
}

export class CorpeoNode extends DecoratorBlockNode {
  __hashCode: string;

  static getType(): string {
    return "corpeo";
  }

  static clone(node: CorpeoNode): CorpeoNode {
    return new CorpeoNode(node.__hashCode, node.__format, node.__key);
  }

  constructor(hashCode: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__hashCode = hashCode;
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedNode: SerializedCorpeoNode): CorpeoNode {
    return $createCorpeoNode(serializedNode.hashCode).updateFromJSON(
      serializedNode
    );
  }

  exportJSON(): SerializedCorpeoNode {
    return {
      ...super.exportJSON(),
      hashCode: this.__hashCode,
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
    return <CorpeoComponent hashCode={this.__hashCode} />;
  }
}

export function $createCorpeoNode(hashCode: string): CorpeoNode {
  return new CorpeoNode(hashCode);
}

export function $isCorpeoNode(
  node: CorpeoNode | LexicalNode | null | undefined
): node is CorpeoNode {
  return node instanceof CorpeoNode;
}
