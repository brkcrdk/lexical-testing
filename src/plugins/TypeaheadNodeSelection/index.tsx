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
import useSlashBadge from "./useSlashBadge";

function TypeaheadNodeSelection() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);


  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  });

  const filteredOptions = useNodeOptions(queryString);

  // Node type kontrolü ekleyin
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
      anchorClassName="relative before:content-['arama yapınız'] before:absolute before:top-0 before:left-0 before:min-w-10 before:size-full before:bg-red-500/50"
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex, options }
      ) => {
        if (anchorElementRef.current == null || options.length === 0) {
          return null;
        }
        // anchorElementRef.current.style.minWidth='200px';
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
