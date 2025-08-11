import type { CustomNodeOption } from "./useGenerateNodeOptions";

interface Props{
  option: CustomNodeOption
  isSelected: boolean 
}
function OptionItem({option,isSelected}:Props) {
  return (
    <li
      className="flex items-center text-black justify-between aria-selected:bg-black/60 aria-selected:text-white p-1 rounded-md relative"
      aria-selected={isSelected}
      data-option={option.key}
      role="option"
      ref={option.setRefElement}
      >
      <span className="text-sm">{option.__nodeOption.title}</span>
      <span className="text-xs">{option.__nodeOption.triggerPattern}</span>
      <div className="absolute -right-10 top-0 bg-white z-10">xxx</div>
    </li>
  );
}

export default OptionItem;