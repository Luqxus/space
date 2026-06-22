'use client';
import { memo } from "react";
import { useStorage } from "@liveblocks/react";
import { LayerType } from "../types/canvas";
import { Rectange } from "./rectangle-layer";

type LayerPreviewProps = {
  id: string
  onLayerPointDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo((props: LayerPreviewProps) => {
  const layer = useStorage((storage) => storage.layers[props.id]);

  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.RECTANGLE:
      return (
        <Rectange key={props.id} id={props.id} layer={layer} selectionColor={props.selectionColor} onPointerDown={props.onLayerPointDown} />
      )

    default:
      console.warn("Unknown type");
      return null
  }
});

LayerPreview.displayName = "LayerPreview"
