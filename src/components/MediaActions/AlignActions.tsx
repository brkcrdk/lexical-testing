import {
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
} from "lucide-react";
import { Popover, ToggleGroup } from "radix-ui";
import { useState, type ReactNode } from "react";
import type { AlignTypes } from "../MediaNodeWrapper";

const alignOptions: Record<AlignTypes, ReactNode> = {
  left: <AlignHorizontalJustifyStart size={16} />,
  center: <AlignHorizontalJustifyCenter size={16} />,
  right: <AlignHorizontalJustifyEnd size={16} />,
};

function AlignActions() {
  const [align, setAlign] = useState<AlignTypes>("left");
  return (
    <Popover.Root>
      <Popover.Trigger className="bg-black/30 !rounded-none hover:bg-black/50 ">
        {alignOptions[align]}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex gap-1 bg-black items-center justify-between">
          <ToggleGroup.Root
            type="single"
            defaultValue={align}
            onValueChange={(value) => {
              setAlign(value as AlignTypes);
            }}>
            {Object.entries(alignOptions).map(([value, icon]) => (
              <ToggleGroup.Item
                key={value}
                value={value}
                className="!rounded-none">
                {icon}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default AlignActions;
