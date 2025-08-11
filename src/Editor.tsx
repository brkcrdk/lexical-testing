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
import DraggableBlockPlugin from "./Plugins/DraggableBlockPlugin";

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
    root.append(initialHeading);
  },
};

function Editor() {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Plugins>
        <div className="grid grid-cols-2 size-full relative">
          <RichTextPlugin
            contentEditable={
              <div
                id="editor-content"
                className="relative border-2 border-red-900 border-dashed pl-14">
                <ContentEditable
                  className="size-full outline-none overflow-auto max-h-10/12"
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
        <DraggableBlockPlugin />
      </Plugins>
    </LexicalComposer>
  );
}

export default Editor;

