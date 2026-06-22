import { CanvasPermissions } from "./permissions";
import { ToolType } from "./tools";

export const MAX_LAYERS = 100

export enum CanvasMode {
  NONE,
  SELECTION_NET,
  TRANSLATING,
  INSERTING,
  PENCIL,
  PRESSING,
  RESIZING
}

export type Color = {
  r: number;
  g: number;
  b: number;
  a?: number
}

export type Point = {
  x: number;
  y: number
}

export type Plane = Point;

export enum LayerType {
  // SHAPES = "Shape",
  //
  RECTANGLE = "Rectangle",
  ELLIPSE = "Ellipse",
  PATH = "Path",
  TEXT = "Text",
  NOTE = "Note",
  FRAME = "Frame"
}

// export enum Shape {
//   NONE = "NONE",
//   RECTANGLE = "Reactangle",
//   ELLIPSE = "Ellipse",
// }

export type Dimentions = {
  height: number;
  width: number;
}

export type XYWH = Point & Dimentions;

export type FontStyle = {
  size: number;
  weight: 'THIN' | 'REGULAR' | 'SEMIBOLD' | 'BOLD' | 'EXTRABOLD';
  fontFamily: string;
}

export enum Side {
  TOP = 1,
  BOTTOM = 2,
  LEFT = 4,
  RIGHT = 8
}

export type RectangleLayer = {
  type: LayerType.RECTANGLE;
  position: Point;
  dimentions: Dimentions;
  fill: Color;
  value?: string;
}

export type EllipseLayer = {
  type: LayerType.ELLIPSE;
  position: Point;
  dimentions: Dimentions;
  fill: Color;
  value?: string;
}

export type PathLayer = {
  type: LayerType.PATH;
  position: Point;
  dimentions: Dimentions;
  points: number[][];
  fill: Color;
  value?: string;
}

export type TextLayer = {
  type: LayerType.TEXT;
  position: Point;
  dimentions: Dimentions;
  fill: Color;
  fontStyle?: FontStyle;
  value?: string;
}

export type NoteLayer = {
  type: LayerType.NOTE;
  position: Point;
  dimentions: Dimentions;
  fill: Color;
  fontStyle?: FontStyle;
  value?: string;
}

// export type CommentLayer = {
//   type: LayerType.COMMENT;
//   position: Point;
//   dimentions?: Dimentions;
//   fill?: Color;
//   fontStyle?: FontStyle;
//   value?: string;
// }

export type FrameLayer = {
  type: LayerType.FRAME;
  position: Point;
  dimentions: Dimentions;
  fill: Color;
  value?: string;
}


export type CanvasStateProto = {
  tool: ToolType;
  mode: CanvasMode;
  layerType: LayerType;
  permission: CanvasPermissions;
  origin: Point;
  current: Point;
  corner: Side;
  initialBound: XYWH;
}

export type CanvasState = {
  tool: ToolType.SELECT;
  mode: CanvasMode.NONE;
  permission: CanvasPermissions;
} | {
  tool: ToolType.REDO;
  mode: CanvasMode.NONE;
  permission: CanvasPermissions;
} | {
  tool: ToolType.UNDO;
  mode: CanvasMode.NONE;
  permission: CanvasPermissions;
} | {
  tool: ToolType.SELECT;
  mode: CanvasMode.SELECTION_NET;
  origin: Point;
  current?: Point;
  permission: CanvasPermissions;
} | {
  tool: ToolType.SELECT;
  mode: CanvasMode.TRANSLATING;
  current: Point;
  permission: CanvasPermissions;
} | {
  tool: ToolType.FRAME | ToolType.PENCILE | ToolType.RECTANGLE | ToolType.ELLIPSE | ToolType.TYPE // | ToolType.RECTANDLE | ToolType.ELLIPE;
  mode: CanvasMode.INSERTING;
  layerType: LayerType.RECTANGLE | LayerType.ELLIPSE | LayerType.NOTE | LayerType.TEXT | LayerType.FRAME;
  permission: CanvasPermissions;
} | {
  tool: ToolType.PENCILE;
  mode: CanvasMode.PENCIL;
  permission: CanvasPermissions;
} | {
  tool: ToolType.SELECT;
  mode: CanvasMode.PRESSING;
  permission: CanvasPermissions;
} | {
  tool: ToolType.SELECT;
  mode: CanvasMode.RESIZING;
  initialBound: XYWH;
  corner: Side;
  permission: CanvasPermissions;
}

export type Layer = EllipseLayer | PathLayer | FrameLayer | RectangleLayer | TextLayer | NoteLayer;
