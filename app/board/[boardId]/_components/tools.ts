import { Ellipse, Frame, LucideIcon, Pencil, Shapes, Type, MousePointer2, MessageCircle, Redo2, Undo2 } from "lucide-react";

export enum ToolType {
  SELECT = "Select",
  PENCILE = "Pencil",
  SHAPES = "Shapes",
  TYPE = "Type",
  FRAME = "Frame",
  COMMENT = "Comment",
  UNDO = "Undo",
  REDO = "Redo",
  ELLIPE = "Ellipse",
  RECTANDLE = "Rectangle"
};



export type Tool = {
  type: ToolType;
  icon: LucideIcon;
}

const SelectTool: Tool = {
  type: ToolType.SELECT,
  icon: MousePointer2
};

const CommentTool: Tool = {
  type: ToolType.COMMENT,
  icon: MessageCircle
};

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

const ShapesTool: Tool = {
  type: ToolType.SHAPES,
  icon: Shapes
};

const TypeTool: Tool = {
  type: ToolType.TYPE,
  icon: Type
};

const FrameTool: Tool = {
  type: ToolType.FRAME,
  icon: Frame
}

export const ReadOnlyTools: Tool[] = [SelectTool, CommentTool];
export const ReadWriteTools: Tool[] = [SelectTool, ShapesTool, TypeTool, PencilTool, FrameTool, CommentTool];
export const UndoRedoTools: Tool[] = [UndoTool, RedoTool];
