
import type { CustomNodeOption } from "./useGenerateNodeOptions";
import { autoUpdate, flip, size, useFloating } from '@floating-ui/react'

interface Props {
  options: CustomNodeOption[];
  selectedIndex: number | null;
  selectOptionAndCleanUp: (option: CustomNodeOption) => void;
  setHighlightedIndex: (index: number) => void;
  /**
   * @description
   * Bu element typeaheadin parentını ifade eden reftir. Bunu useFloatingde kullanarak listenin
   * portalda alabileceği yüksekliği belirtebiliyoruz.
   */
  anchorElement: HTMLElement;
}

function NodeList({ options,selectedIndex,selectOptionAndCleanUp,setHighlightedIndex,anchorElement }:Props) {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    elements: {
      reference: anchorElement,
    },
    middleware: [
      flip(),
      size({
        padding: 12,
        apply({ availableHeight, elements }) {
          elements.floating.style.maxHeight = `${availableHeight}px`;
          elements.floating.style.overflowY = "auto";
        },
      }),
    ],
  });


  return (
    <ul ref={refs.setFloating} style={floatingStyles} className="bg-white shadow-md rounded-md p-2 relative w-2xs">
      {options.map((option, index) => (
        <li
          key={option.key}
          className="flex items-center text-black justify-between aria-selected:bg-black/60 aria-selected:text-white p-1 rounded-md relative"
          aria-selected={selectedIndex === index}
          data-option={option.key}
          role="option"
          ref={option.setRefElement}
          onClick={() => {
            setHighlightedIndex(index);
            selectOptionAndCleanUp(option);
          }}
          onPointerEnter={() => {
            setHighlightedIndex(index);
          }}
          >
          <span className="text-sm">{option.nodeOption.title}</span>
          <span className="text-xs">{option.nodeOption.triggerPattern}</span>
        </li>
      ))}
    </ul>
  );
}

export default NodeList;