import { Fragment, type PropsWithChildren } from "react";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import MainHeadingPlugin from "./MainHeadingPlugin";
import ParagraphNodeFocusPlugin from "./ParagraphNodeFocusPlugin";
import DraggableBlockPlugin from "./DraggableBlockPlugin";
import TypeaheadNodeSelection from "./TypeaheadNodeSelection";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin'
import CollapsiblePlugin from "./CollapsiblePlugin";
import CorpeoPlugin from "./CorpeoPlugin";
import PdfPlugin from "./PdfPlugin";
import FloatingToolbarPlugin from "./FloatingToolbarPlugin";

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
      <TypeaheadNodeSelection />
      <ListPlugin hasStrictIndent/>
      <HorizontalRulePlugin />
      <TabIndentationPlugin />
      <CollapsiblePlugin />
      <CorpeoPlugin />
      <PdfPlugin />
      <FloatingToolbarPlugin />
    </Fragment>
  );
}

export default Plugins;