'use client';
import { rgbToHex } from "@/lib/utils";
import { Color } from "../types/canvas"

type ColorPickerProps = {
  onChange: (color: Color) => void
}


const COLORS: Array<{ colorId: string } & Color> = [
  { colorId: 'white', r: 255, g: 255, b: 255 },
  { colorId: 'purple', r: 128, g: 0, b: 128 },
  { colorId: 'orange', r: 255, g: 165, b: 0 },
  { colorId: 'olive-drab', r: 107, g: 142, b: 35 },
  { colorId: 'orange-red', g: 255, r: 69, b: 0 },
  { colorId: 'teal', r: 0, g: 128, b: 128 }
];

export const ColorPicker = (props: ColorPickerProps) => {
  return (
    <div
      className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      {
        COLORS.map(color => (<ColorButton key={color.colorId} onClick={props.onChange} color={color} />))
      }
    </div>
  );
}

type ColorButtonProps = {
  onClick: (color: Color) => void;
  color: Color
}
const ColorButton = (props: ColorButtonProps) => {

  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => { props.onClick(props.color) }}>
      <div
        className="h-8 w-8 rounded-full border border-neutral-300"
        style={{
          background: rgbToHex(props.color)
        }} />
    </button>
  )
}

ColorPicker.displayName = "ColorPicker";
