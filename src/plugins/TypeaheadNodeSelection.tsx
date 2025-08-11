import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalTypeaheadMenuPlugin, MenuOption, useBasicTypeaheadTriggerMatch } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";


class OptionItem extends MenuOption {
  __nodeName:string;

  constructor(title: string, nodeName:string) {
    super(title);
    this.__nodeName = nodeName;
  }
}

const options:OptionItem[] = [
  new OptionItem("Option 1", "p"),
  new OptionItem("Option 2", "h1"),
  new OptionItem("Option 3", "h2"),
];


function TypeaheadNodeSelection() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);


   const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
     minLength: 0,
     punctuation: "/",
   });

   const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      return option.__nodeName.toLowerCase().includes(queryString?.toLowerCase() || '');
    });
   }, [queryString]);

  return (
    <LexicalTypeaheadMenuPlugin
      onQueryChange={setQueryString}
      onSelectOption={()=>console.log('xx')}
      triggerFn={checkForTriggerMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
      ) => {
        if (anchorElementRef.current == null || options.length === 0) {
          return null;
        }

        return anchorElementRef.current && options.length
          ? createPortal(
              <ul className="bg-white shadow-md rounded-md p-2 relative w-2xs">
                {filteredOptions.length ? (
                  filteredOptions.map((option: OptionItem, index) => (
                    <li
                      aria-selected={selectedIndex === index}
                      key={option.key}
                      onPointerEnter={() => setHighlightedIndex(index)}
                      onClick={() => {
                        setHighlightedIndex(index);
                        selectOptionAndCleanUp(option);
                      }}
                      className="flex items-center text-black justify-between aria-selected:bg-black/40 aria-selected:text-white p-1 rounded-md">
                      {option.__nodeName}
                    </li>
                  ))
                ) : (
                  <li className="flex items-center text-black justify-between aria-selected:bg-black/40 aria-selected:text-white p-1 rounded-md">
                    No options found
                  </li>
                )}
              </ul>,
              anchorElementRef.current
            )
          : null;
      }}
    />
  );
}

export default TypeaheadNodeSelection;