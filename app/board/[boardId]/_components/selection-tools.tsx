'use client';

import { memo } from "react";
import { Color, Plane } from "../types/canvas";
import { useMutation, useSelf } from "@liveblocks/react";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";

type SelectionToolsProps = {
  plane: Plane;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo((props: SelectionToolsProps) => {
  const selection = useSelf((me) => me.presence.selection);
  const selectionBounds = useSelectionBounds();

  const setFill = useMutation((
    { storage },
    fill: Color
  ) => {
    const liveLayers = storage.get("layers");
    props.setLastUsedColor(fill);

    selection?.forEach((id) => {
      liveLayers.get(id)?.set('fill', fill);
    });

  }, [selection, props.setLastUsedColor]);

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
      <ColorPicker onChange={setFill} />
    </div>
  )
});

SelectionTools.displayName = "SelectionTools";
