import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { $getSelection, $isRangeSelection } from "lexical";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { $isMainHeadingNode } from "../../nodes/MainHeadingNode";
import NodeList from "./NodeList";
import useNodeOptions, { CustomNodeOption } from "./useGenerateNodeOptions";

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


  return (
    <LexicalTypeaheadMenuPlugin<CustomNodeOption>
      onQueryChange={setQueryString}
      onSelectOption={() => console.log("xx")}
      triggerFn={$shouldShowTypeahead}
      options={filteredOptions}
      anchorClassName="slash-placeholder"
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex, options }
      ) => {
        if (anchorElementRef.current == null || options.length === 0) {
          return null;
        }

        if(queryString){
          anchorElementRef.current.removeAttribute("data-placeholder");
        }else{
          anchorElementRef.current.setAttribute("data-placeholder",'filter her..');
        }
        
        return createPortal(
          <NodeList 
            options={options}
            selectedIndex={selectedIndex}
            selectOptionAndCleanUp={selectOptionAndCleanUp} 
            setHighlightedIndex={setHighlightedIndex} 
            anchorElement={anchorElementRef.current}
          />,
          anchorElementRef.current
        );
      }}
    />

  );
}

export default TypeaheadNodeSelection;
