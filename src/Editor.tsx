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
import ParagraphNodeChangeListener from "./plugins/ParagraphNodeChangeListener";
import { useDataAttributes } from "./hooks/useDataAttributes";

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

function TestButton() {
  const {
    setAttributeOnSelection,
    setHighlighted,
    setPriority,
    setStatus,
    setFocus,
    removeHighlighted,
    removePriority,
    setMultipleAttributesOnSelection,
    removeMultipleAttributesFromSelection,
  } = useDataAttributes();

  const buttonStyle = {
    padding: "8px 16px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    margin: "5px",
  };

  return (
    <div style={{ padding: "10px", borderRadius: "8px", margin: "10px" }}>
      <h4 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
        Data Attribute Controls:
      </h4>

      <button
        onClick={() => setFocus()}
        style={{ ...buttonStyle, backgroundColor: "#007acc" }}
      >
        Set Focus
      </button>

      <button
        onClick={() => setHighlighted()}
        style={{ ...buttonStyle, backgroundColor: "#28a745" }}
      >
        Set Highlighted
      </button>

      <button
        onClick={() => setPriority("high")}
        style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
      >
        Set Priority High
      </button>

      <button
        onClick={() => setStatus("draft")}
        style={{ ...buttonStyle, backgroundColor: "#6c757d" }}
      >
        Set Status Draft
      </button>

      <button
        onClick={() => removeHighlighted()}
        style={{ ...buttonStyle, backgroundColor: "#fd7e14" }}
      >
        Remove Highlighted
      </button>

      <button
        onClick={() => removePriority()}
        style={{ ...buttonStyle, backgroundColor: "#fd7e14" }}
      >
        Remove Priority
      </button>

      <button
        onClick={() =>
          setMultipleAttributesOnSelection({
            "custom-attr": "test-value",
            "another-attr": true,
            "third-attr": "multiple",
          })
        }
        style={{ ...buttonStyle, backgroundColor: "#6f42c1" }}
      >
        Set Multiple Attrs
      </button>

      <button
        onClick={() =>
          removeMultipleAttributesFromSelection([
            "custom-attr",
            "another-attr",
            "third-attr",
          ])
        }
        style={{ ...buttonStyle, backgroundColor: "#6f42c1" }}
      >
        Remove Multiple Attrs
      </button>

      <button
        onClick={() =>
          setAttributeOnSelection("dynamic", new Date().getTime().toString())
        }
        style={{ ...buttonStyle, backgroundColor: "#20c997" }}
      >
        Set Dynamic Value
      </button>
    </div>
  );
}

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
        }}
      >
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

        <CustomTreeView />
      </div>

      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <MainHeadingPlugin />
      <ParagraphNodeChangeListener />
      <TestButton />
    </LexicalComposer>
  );
}

export default Editor;
