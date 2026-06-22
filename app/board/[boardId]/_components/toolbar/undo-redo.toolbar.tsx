import { ToolType, UndoRedoTools } from "../../types/tools";
import { Tools } from './tools.toolbar';
import { useCanRedo, useCanUndo, useHistory } from "@liveblocks/react";

type UndoRedoToolbarProps = {
  activeTool: ToolType,
}

export const UndoRedoToolbar = (props: UndoRedoToolbarProps) => {
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const disabledTools = () => {
    const disabled = []
    if (!canRedo) {
      disabled.push(ToolType.REDO)
    }

    if (!canUndo) {
      disabled.push(ToolType.UNDO);
    }

    return disabled;
  };

  const toggleHistory = (tool: ToolType) => {
    if (tool === ToolType.UNDO) history.undo();
    if (tool === ToolType.REDO) history.redo();
  }

  return (
    <div className="bg-white p-1.5 flex flex-col items-center shadow-md">
      <Tools key="undo-redo" tools={UndoRedoTools} selectedTool={props.activeTool} onSelect={toggleHistory} disabled={disabledTools()} />
    </div>
  );
}
