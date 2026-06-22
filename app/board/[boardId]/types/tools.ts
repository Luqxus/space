import { Frame, LucideIcon, Pencil, Shapes, Type, MousePointer2, MessageCircle, Redo2, Undo2, RectangleVertical, Ellipse, RectangleHorizontal } from "lucide-react";

export enum ToolType {
  // NONE = "None",
  SELECT = "Select",
  PENCILE = "Pencil",
  RECTANGLE = "Rectangle",
  ELLIPSE = "Ellipse",
  TYPE = "Type",
  FRAME = "Frame",
  // COMMENT = "Comment",
  UNDO = "Undo",
  REDO = "Redo",
  // ELLIPE = "Ellipse",
  // RECTANDLE = "Rectangle"
}

// ToolType.SELECT | ToolType.PENCILE | ToolType.SHAPES | ToolType.TYPE | ToolType.FRAME | ToolType.COMMENT | ToolType.UNDO | ToolType.REDO

export type Tool = {
  type: ToolType;
  icon: LucideIcon;
}

const SelectTool: Tool = {
  type: ToolType.SELECT,
  icon: MousePointer2
};
//
// const CommentTool: Tool = {
//   type: ToolType.COMMENT,
//   icon: MessageCircle
// };

const RedoTool: Tool = {
  type: ToolType.REDO,
  icon: Redo2,
}

const UndoTool: Tool = {
  type: ToolType.UNDO,
  icon: Undo2
}

const PencilTool: Tool = {
  type: ToolType.PENCILE,
  icon: Pencil
};

const RectangleTool: Tool = {
  type: ToolType.RECTANGLE,
  icon: RectangleHorizontal
}

const EllipseTool: Tool = {
  type: ToolType.ELLIPSE,
  icon: Ellipse
}

const TypeTool: Tool = {
  type: ToolType.TYPE,
  icon: Type
};

const FrameTool: Tool = {
  type: ToolType.FRAME,
  icon: Frame
}

export const ReadOnlyTools: Tool[] = [SelectTool];
export const ReadWriteTools: Tool[] = [RectangleTool, EllipseTool, TypeTool, PencilTool, FrameTool];
export const UndoRedoTools: Tool[] = [UndoTool, RedoTool];
