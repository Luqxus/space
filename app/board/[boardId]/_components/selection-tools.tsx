'use client';

import { memo } from "react";
import { Color, Plane } from "../types/canvas";
import { useSelf } from "@liveblocks/react";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

type SelectionToolsProps = {
  plane: Plane;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo((props: SelectionToolsProps) => {
  const selection = useSelf((me) => me.presence.selection);
  const selectionBounds = useSelectionBounds();

  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + props.plane.x;
  const y = selectionBounds.y + props.plane.y;

  console.log("Selection tool", { x, y })


  return (
    <div className="absolute p-2 bg-white shadow-sm border flex select-none"
      style={{
        transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`
      }}>
      Selection Tools
    </div>
  )
});

SelectionTools.displayName = "SelectionTools";
