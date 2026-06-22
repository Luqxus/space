import { Color, Plane, Point, Side, XYWH } from "@/app/board/[boardId]/types/canvas"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a pointer event's client coordinates to a position on the canvas,
 * accounting for the canvas plane's offset.
 *
 * @param e - The React pointer event containing client coordinates.
 * @param plane - The canvas plane with x/y offset values.
 * @returns A `Point` representing the position relative to the canvas.
 */
export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  plane: Plane
) {
  return {
    x: Math.round(e.clientX) - plane.x,
    y: Math.round(e.clientY) - plane.y
  }
}

/**
 * Converts an RGB color object to a hexadecimal color string.
 *
 * @param color - The RGB color object with `r`, `g`, and `b` values (0–255).
 * @returns A hex color string in the format `#rrggbb`.
 *
 * @example
 * rgbToHex({ r: 255, g: 0, b: 128 }) // "#ff0080"
 */
export function rgbToHex(color: Color) {
  const red = color.r.toString(16).padStart(2, "0");
  const green = color.g.toString(16).padStart(2, "0");
  const blue = color.b.toString(16).padStart(2, "0");
  return `#${red}${green}${blue}`
}

/**
 * A function that computes new bounds when resizing from a specific side or corner.
 *
 * @param resizedBounds - A copy of the current bounds to mutate and return.
 * @param point - The current pointer position on the canvas.
 * @param bounds - The original bounds before resizing began.
 * @returns The updated `XYWH` bounds after applying the resize.
 */
type ResizeHandlerFunction = (resizedBounds: XYWH, point: Point, bounds: XYWH) => XYWH;

/**
 * A map of bitmask side/corner values to their corresponding resize handler.
 * Supports single sides (LEFT, RIGHT, TOP, BOTTOM) and all four corners.
 *
 * @internal
 */
const ResizeHandler: Record<number, ResizeHandlerFunction> = {
  [Side.LEFT]: (resizedBounds, point, bounds): XYWH => ({
    ...resizedBounds,
    x: Math.min(point.x, bounds.x + bounds.width),
    width: Math.abs(bounds.x + bounds.width - point.x),
  }),
  [Side.RIGHT]: (resizedBounds, point, bounds): XYWH => ({
    ...resizedBounds,
    x: Math.min(point.x, bounds.x),
    width: Math.abs(point.x - bounds.x),
  }),
  [Side.TOP]: (resizedBounds, point, bounds): XYWH => ({
    ...resizedBounds,
    y: Math.min(point.y, bounds.y + bounds.height),
    height: Math.abs(bounds.y + bounds.height - point.y),
  }),
  [Side.BOTTOM]: (resizedBounds, point, bounds): XYWH => ({
    ...resizedBounds,
    y: Math.min(point.y, bounds.y),
    height: Math.abs(point.y - bounds.y),
  }),
  [Side.TOP | Side.LEFT]: (resizedBounds, point, bounds): XYWH => ({
    ...resizedBounds,
    x: Math.min(point.x, bounds.x + bounds.width),
    width: Math.abs(bounds.x + bounds.width - point.x),
    y: Math.min(point.y, bounds.y + bounds.height),
    height: Math.abs(bounds.y + bounds.height - point.y),
  }),
  [Side.TOP | Side.RIGHT]: (resizedBounds, point, bounds): XYWH => ({
    ...resizedBounds,
    x: Math.min(point.x, bounds.x),
    width: Math.abs(point.x - bounds.x),
    y: Math.min(point.y, bounds.y + bounds.height),
    height: Math.abs(bounds.y + bounds.height - point.y),
  }),
  [Side.BOTTOM | Side.LEFT]: (resizedBounds, point, bounds): XYWH => ({
    ...resizedBounds,
    x: Math.min(point.x, bounds.x + bounds.width),
    width: Math.abs(bounds.x + bounds.width - point.x),
    y: Math.min(point.y, bounds.y),
    height: Math.abs(point.y - bounds.y),
  }),
  [Side.BOTTOM | Side.RIGHT]: (resizedBounds, point, bounds): XYWH => ({
    ...resizedBounds,
    x: Math.min(point.x, bounds.x),
    width: Math.abs(point.x - bounds.x),
    y: Math.min(point.y, bounds.y),
    height: Math.abs(point.y - bounds.y),
  }),
};

/**
 * Computes new bounds for a resizable element based on which corner/side is
 * being dragged and the current pointer position.
 *
 * Uses a bitmask lookup via `ResizeHandler` to support all sides and corners.
 * If no handler is found for the given `corner`, the original bounds are returned unchanged.
 *
 * @param bounds - The original bounds of the element before resizing.
 * @param corner - A `Side` bitmask indicating which side or corner is being dragged.
 * @param point - The current pointer position on the canvas.
 * @returns The updated `XYWH` bounds after applying the resize, or the original bounds if no handler matched.
 *
 * @example
 * resizeBounds(bounds, Side.TOP | Side.LEFT, pointerPosition);
 */
export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const resizedBounds: XYWH = { ...bounds };
  const handler = ResizeHandler[corner];
  return handler ? handler(resizedBounds, point, bounds) : resizedBounds;
}
