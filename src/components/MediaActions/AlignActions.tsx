import {
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
} from "lucide-react";
import { Popover, ToggleGroup } from "radix-ui";
import { type ReactNode } from "react";
import type { AlignTypes } from "../MediaNodeWrapper";

const alignOptions: Record<AlignTypes, ReactNode> = {
  start: <AlignHorizontalJustifyStart className="size-full" />,
  center: <AlignHorizontalJustifyCenter className="size-full" />,
  end: <AlignHorizontalJustifyEnd className="size-full" />,
};

interface AlignActionsProps {
  align: AlignTypes;
  onAlignChange?: (align: AlignTypes) => void;
}

function AlignActions({ onAlignChange, align }: AlignActionsProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className="bg-black/30 !rounded-none hover:bg-black/50 ">
        {alignOptions[align]}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <ToggleGroup.Root
            type="single"
            defaultValue={align}
            className="flex gap-1 bg-black items-center justify-between p-0.5"
            onValueChange={(value) => {
              if (onAlignChange && value) {
                onAlignChange(value as AlignTypes);
              }
            }}>
            {Object.entries(alignOptions).map(([value, icon]) => (
              <ToggleGroup.Item
                key={value}
                value={value}
                className="!rounded-none size-6">
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
