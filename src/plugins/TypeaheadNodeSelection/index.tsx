import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { $createTextNode, $getSelection, $insertNodes, $isRangeSelection, $isTextNode, INSERT_PARAGRAPH_COMMAND } from "lexical";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { $isMainHeadingNode } from "../../nodes/MainHeadingNode";
import NodeList from "./NodeList";
import useNodeOptions, { CustomNodeOption } from "./useGenerateNodeOptions";
import { $createCustomHeadingNode } from "../../nodes/CustomHeadingNode";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { $createQuoteNode  } from "@lexical/rich-text";
import {  INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { INSERT_COLLAPSIBLE_COMMAND } from "../CollapsiblePlugin";
import { $createCorpeoNode } from "../../nodes/CorpeoNode";
import { $createPDFNode } from "../../nodes/PDFNode";

function TypeaheadNodeSelection() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
    allowWhitespace: true,
    punctuation:'/'
  });

  const filteredOptions = useNodeOptions(queryString);

  const $shouldShowTypeahead = useCallback(
    (text: string) => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return null;

      const anchorNode = selection.anchor.getNode();
      const parentNode = anchorNode.getParent();

      const isMainHeadingNode = $isMainHeadingNode(parentNode);
      if (isMainHeadingNode) {
        return null;
      }
      return checkForTriggerMatch(text, editor);
    },
    [editor, checkForTriggerMatch]
  );

  const $handleSelectOption = useCallback((val:CustomNodeOption)=>{
    const selection = $getSelection();

    if($isRangeSelection(selection)){
      const anchorNode = selection.anchor.getNode();

      if (val.__nodeOption.nodeName === "text") {
        editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);
      }

      if (val.__nodeOption.type === "heading") {
        const newHeading = $createCustomHeadingNode(
          val.__nodeOption.headingLevel
        );
        $insertNodes([newHeading]);
      }

      if (val.__nodeOption.type === "list") {
        const isOrderedList = val.__nodeOption.listType === "ordered";
        const listNode = $createListNode(isOrderedList ? "number" : "bullet");
        const listItemNode = $createListItemNode();
        const textNode = $createTextNode("");
        listItemNode.append(textNode);
        listNode.append(listItemNode);
        $insertNodes([listNode]);
      }

      if (val.__nodeOption.nodeName === "quote") {
        const quoteNode = $createQuoteNode();
        $insertNodes([quoteNode]);
      }

      if (val.__nodeOption.nodeName === "divider") {
        editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
      }

      if (val.__nodeOption.nodeName === "toggle-list") {
        return editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined);
      }

      if(val.__nodeOption.nodeName === "corpeo"){
        const corpeoNode = $createCorpeoNode("");
        $insertNodes([corpeoNode]);
      }

      if(val.__nodeOption.nodeName === "pdf"){
        const pdfNode = $createPDFNode();
        $insertNodes([pdfNode]);
      }

      // Ekleme işlemleri bittikten sonra typeahead değerini temizliyoruz.
      if($isTextNode(anchorNode)){
        anchorNode.setTextContent('')
      }
    }
  },[editor])


  return (
    <LexicalTypeaheadMenuPlugin<CustomNodeOption>
      onQueryChange={setQueryString}
      onSelectOption={$handleSelectOption}
      triggerFn={$shouldShowTypeahead}
      options={filteredOptions}
      anchorClassName="invisible"
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex, options }
      ) => {
        if (anchorElementRef.current == null || options.length === 0) {
          return null;
        }
        return createPortal(
          <NodeList 
            options={options}
            selectedIndex={selectedIndex}
            selectOptionAndCleanUp={selectOptionAndCleanUp} 
            setHighlightedIndex={setHighlightedIndex} 
          />,
          anchorElementRef.current
        );
      }}
    />
  );
}

export default TypeaheadNodeSelection;
