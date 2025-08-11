import { Fragment, type PropsWithChildren } from "react";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import MainHeadingPlugin from "./MainHeadingPlugin";
import ParagraphNodeFocusPlugin from "./ParagraphNodeFocusPlugin";
import DraggableBlockPlugin from "./DraggableBlockPlugin";

/**
 * Context kullanarak çalışabilecek ve kendi başına render yapabilecek(floating toolbar, flotating menu vb)
 * tüm componentler burada render edilir. Böylece ana editorü render ettiğimiz functiondaki daha az component
 * renderı içinde kalır.
 */
function Plugins({ children }: PropsWithChildren) {
  return (
    <Fragment>
      {children}
      <OnChangePlugin
        onChange={(editorState) => {
          // console.log(editorState);
        }}
      />
      <HistoryPlugin />
      <MainHeadingPlugin />
      <ParagraphNodeFocusPlugin />
      <AutoFocusPlugin />
      <DraggableBlockPlugin />
    </Fragment>
  );
}

export default Plugins;