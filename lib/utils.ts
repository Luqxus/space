import { Color, Plane } from "@/app/board/[boardId]/types/canvas"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  plane: Plane
) {
  return {
    x: Math.round(e.clientX) - plane.x,
    y: Math.round(e.clientY) - plane.y
  }
}

export function rgbToHex(color: Color) {
  const red = color.r.toString(16).padStart(2, "0");
  const green = color.g.toString(16).padStart(2, "0");
  const blue = color.b.toString(16).padStart(2, "0");

  return `#${red}${green}${blue}`
}
