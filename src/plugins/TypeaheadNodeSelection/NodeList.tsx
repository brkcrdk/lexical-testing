import OptionItem from "./OptionItem";
import type { CustomNodeOption } from "./useGenerateNodeOptions";

interface Props{
  options: CustomNodeOption[];
  selectedIndex: number|null; 
  selectOptionAndCleanUp: (option: CustomNodeOption) => void;
  setHighlightedIndex: (index: number) => void;
}

function NodeList({ options,selectedIndex }:Props) {
  return (
      <ul className="bg-white shadow-md rounded-md p-2 relative w-2xs ">
        {options.map((option, index) => (
          <OptionItem
            key={option.key}
            option={option}
            isSelected={selectedIndex === index}
          />
        ))}
      </ul>
  );
}

export default NodeList;