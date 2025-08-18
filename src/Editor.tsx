import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, type EditorThemeClasses } from "lexical";
// import { $createCustomParagraphNode } from "./nodes/CustomParagraphNode";
import CustomTreeView from "./CustomTreeView";
import { $createMainHeadingNode } from "./nodes/MainHeadingNode";

import nodes from "./nodes";
import Plugins from "./Plugins";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

const theme: EditorThemeClasses = {
  list: {
    listitem: "list-item",
  },
  quote: "border-l-4 border-gray-300 pl-4 ml-4",
  heading: {
    h1: "text-2xl font-bold",
    h2: "text-xl font-bold",
    h3: "text-lg font-bold",
    h4: "text-base font-bold",
    h5: "text-sm font-bold",
    h6: "text-xs font-bold",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
};

const initialConfig: InitialConfigType = {
  namespace: "MyEditor",
  onError,
  nodes,
  theme,
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
        <div className="grid grid-cols-2 size-full relative min-h-svh">
          <RichTextPlugin
            contentEditable={
              <div
                id="editor-content"
                className="relative border-2 border-red-900 border-dashed pl-14">
                <ContentEditable
                  className="size-full outline-none overflow-auto"
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
      </Plugins>
    </LexicalComposer>
  );
}

export default Editor;

