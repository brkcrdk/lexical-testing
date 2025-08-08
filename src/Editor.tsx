import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot } from "lexical";
// import { $createCustomParagraphNode } from "./nodes/CustomParagraphNode";
import CustomTreeView from "./CustomTreeView";
import { $createMainHeadingNode } from "./nodes/MainHeadingNode";

import nodes from "./nodes";
import Plugins from "./Plugins";

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
  nodes,
  editorState: () => {
    const root = $getRoot();
    const initialHeading = $createMainHeadingNode();
    // const initialParagraph = $createCustomParagraphNode();
    root.append(initialHeading);
  },
};

function Editor() {
  //  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
  //    if (_floatingAnchorElem !== null) {
  //      setFloatingAnchorElem(_floatingAnchorElem);
  //    }
  //  };

  // const [floatingAnchorElem, setFloatingAnchorElem] =
  //   useState<HTMLDivElement | null>(null);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Plugins>
        <div className="grid grid-cols-2 size-full">
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
              <ContentEditable
                className="size-full outline-none overflow-auto max-h-10/12"
                data-placeholder={"Enter some text..."}
                aria-placeholder={"Enter some text..."}
                placeholder={<div />}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <CustomTreeView />
        </div>
      </Plugins>
    </LexicalComposer>
  );
}

export default Editor;
