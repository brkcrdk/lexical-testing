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
import MainHeadingPlugin from "./plugins/MainHeadingPlugin";
import CustomTreeView from "./plugins/CustomTreeView";
import ParagraphNodeFocusPlugin from "./plugins/ParagraphNodeFocusPlugin";

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
    const initialMainHeading = $createMainHeadingNode();
    const initialParagraph = $createCustomParagraphNode();
    root.append(initialMainHeading, initialParagraph);
  },
};

function Editor() {
  const onChange = (editorState: EditorState) => {
    // console.log(editorState);
  };

  //  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
  //    if (_floatingAnchorElem !== null) {
  //      setFloatingAnchorElem(_floatingAnchorElem);
  //    }
  //  };

  // const [floatingAnchorElem, setFloatingAnchorElem] =
  //   useState<HTMLDivElement | null>(null);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.7fr 0.3fr",
          width: "100%",
          height: "100%",
        }}>
        {/* <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable placeholder={placeholder} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        /> */}
        {/* <DraggableBlockPlugin anchorElem={floatingAnchorElem} /> */}
        <RichTextPlugin
          contentEditable={
            <div style={{ position: "relative" }}>
              <button style={{ position: "absolute", top: 0, left: 0 }}>
                test button
              </button>
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
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <CustomTreeView />
      </div>

      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <MainHeadingPlugin />
      <ParagraphNodeFocusPlugin />
    </LexicalComposer>
  );
}

export default Editor;
