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
import { useRef } from "react";

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
  const contentEditableRef = useRef<HTMLDivElement | undefined>(undefined);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Plugins>
        <div className="grid grid-cols-2 size-full relative border-2 border-blue-900">
          <RichTextPlugin
            contentEditable={
              <div
                className="relative"
                ref={(ref) => {
                  if (ref) {
                    contentEditableRef.current = ref;
                  }
                }}>
                <ContentEditable
                  className="size-full outline-none overflow-auto max-h-10/12"
                  data-placeholder={"Enter some text..."}
                  aria-placeholder={"Enter some text..."}
                  placeholder={
                    <div>
                      <p>Enter some text...</p>
                    </div>
                  }
                />
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <CustomTreeView />
        </div>
        <DraggableBlockPlugin anchorElem={contentEditableRef.current} />
      </Plugins>
    </LexicalComposer>
  );
}

export default Editor;
