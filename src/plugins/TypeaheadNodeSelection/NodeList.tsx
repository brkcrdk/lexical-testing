
import type { CustomNodeOption } from "./useGenerateNodeOptions";
import { Popover } from "radix-ui";

interface Props {
  options: CustomNodeOption[];
  selectedIndex: number | null;
  selectOptionAndCleanUp: (option: CustomNodeOption) => void;
  setHighlightedIndex: (index: number) => void;
}

function NodeList({ options, selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }: Props) {
  return (
    <Popover.Root open>
      <Popover.Trigger />
      <Popover.Portal>
        <Popover.Content
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}>
          <ul className="bg-white shadow-sm rounded-md p-2 relative w-2xs max-h-(--radix-popover-content-available-height) overflow-y-auto">
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
                }}>
                <span className="text-sm">{option.__nodeOption.title}</span>
                <span className="text-xs">
                  {option.__nodeOption.triggerPattern}
                </span>
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default NodeList;