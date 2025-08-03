import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $createParagraphNode, $getRoot, ParagraphNode } from "lexical";
import {
  $createMainHeadingNode,
  MainHeadingNode,
} from "./nodes/MainHeadingNode";

const theme = {
  // Theme styling goes here
  //...
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

const initialConfig: InitialConfigType = {
  namespace: "MyEditor",
  theme,
  onError,
  nodes: [MainHeadingNode, ParagraphNode],
  editorState: () => {
    const root = $getRoot();
    const mainHeading = $createMainHeadingNode();
    const paragraph = $createParagraphNode();
    root.append(mainHeading, paragraph);
  },
};

function Editor() {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="editor-container"
            style={{
              height: "90vh",
              width: "90vw",
              border: "1px solid #ccc",
              padding: "10px",
              overflow: "auto",
              margin: "0 auto",
              position: "relative",
            }}
            data-placeholder={"Enter some text..."}
            aria-placeholder={"Enter some text..."}
            placeholder={<div />}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}

export default Editor;
