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
import CustomTreeView from "./plugins/CustomTreeView";
import HeadingPlaceholderListener from "./plugins/HeadingPlaceholderListener";

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
    CustomParagraphNode,
    {
      replace: ParagraphNode,
      with: () => $createCustomParagraphNode(),
      withKlass: CustomParagraphNode,
    },
    MainHeadingNode,
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.7fr 0.3fr",
          width: "100%",
          height: "100%",
        }}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor-container"
              style={{
                width: "100%",
                height: "100%",
                outline: "none",
                maxHeight: "60svh",
                overflow: "auto",
              }}
              data-placeholder={"Enter some text..."}
              aria-placeholder={"Enter some text..."}
              placeholder={<div />}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* <HeadingPlaceholderListener /> */}
        <CustomTreeView />
      </div>

      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <HeadingRemove />
    </LexicalComposer>
  );
}

export default Editor;
