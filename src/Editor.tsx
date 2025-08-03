import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, ParagraphNode, type EditorState } from "lexical";
import {
  $createMainHeadingNode,
  MainHeadingNode,
} from "./nodes/MainHeadingNode";
import {
  $createCustomParagraphNode,
  CustomParagraphNode,
} from "./nodes/CustomParagraphNode";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HeadingNode } from "@lexical/rich-text";
import HeadingRemove from "./plugins/HeadingRemove";

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
  nodes: [
    MainHeadingNode,
    CustomParagraphNode,
    {
      replace: ParagraphNode,
      with: () => $createCustomParagraphNode(),
      withKlass: CustomParagraphNode,
    },
    {
      replace: HeadingNode,
      with: () => $createMainHeadingNode(),
      withKlass: MainHeadingNode,
    },
  ],
  editorState: () => {
    const root = $getRoot();
    const mainHeading = $createMainHeadingNode();
    const paragraph = $createCustomParagraphNode();
    root.append(mainHeading, paragraph);
  },
};

function Editor() {
  const onChange = (editorState: EditorState) => {
    // console.log(editorState);
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <div>
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
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HeadingRemove />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}

export default Editor;
