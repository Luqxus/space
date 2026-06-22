import { Layer, XYWH } from "@/app/board/[boardId]/types/canvas";
import { shallow } from "@liveblocks/client";
import { useSelf, useStorage } from "@liveblocks/react";



const boundingBox = (layers: Layer[]): XYWH | null => {
  const first = layers[0];

  if (!first) {
    return null;
  }

  let left = first.position.x;
  let right = first.position.x + first.dimentions.width;
  let top = first.position.y;
  let bottom = first.position.y + first.dimentions.height;

  for (let i = 1; i < layers.length; i++) {
    const { position, dimentions } = layers[i];

    if (left > position.x) {
      left = position.x;
    }

    if (right < position.x + dimentions.width) {
      right = position.x + dimentions.width;
    }

    if (top > position.y) {
      top = position.y;
    }

    if (bottom < position.y + dimentions.height) {
      bottom = position.y + dimentions.height;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};


export const useSelectionBounds = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useStorage((storage) => {
    const selectionLayers = (selection ?? []).map((layerId) => storage.layers[layerId]!)
      .filter(Boolean);

    return boundingBox((selectionLayers))
  }, shallow);
}
