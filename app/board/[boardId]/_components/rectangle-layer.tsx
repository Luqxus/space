import { rgbToHex } from "@/lib/utils";
import { RectangleLayer } from "../types/canvas";

type RectangeLayerProps = {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string
}


export const Rectange = (props: RectangeLayerProps) => {
  const { position, dimentions, fill } = props.layer;

  console.log("Selection Color", props.selectionColor)

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => props.onPointerDown(e, props.id)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      x={0}
      y={0}
      width={dimentions.width}
      height={dimentions.height}
      strokeWidth={1}
      fill={fill ? rgbToHex(fill) : '#CCC'}
      stroke={props.selectionColor ?? "transparent"}
    />
  );
}
