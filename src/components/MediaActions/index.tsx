import type { AlignTypes } from "../MediaNodeWrapper";
import AlignActions from "./AlignActions";

interface MediaActionsProps {
  onAlignChange?: (align: AlignTypes) => void;
  align: AlignTypes;
}

function MediaActions({ onAlignChange, align }: MediaActionsProps) {
  return (
    <div className="flex items-center gap-2 absolute top-1 right-1 bg-black/50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <AlignActions onAlignChange={onAlignChange} align={align} />
    </div>
  );
}

export default MediaActions;
