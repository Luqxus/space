import { Skeleton } from "@/components/ui/skeleton";
import { UndoRedoToolbar } from './undo-redo.toolbar';
import { ReadOnlyTools, ReadWriteTools, ToolType } from "../../types/tools";
import { Tools } from './tools.toolbar';
import { hasEditPermissions } from './helpers';
import { useCanvasState } from "@/hooks/use-canvas-state";

export const Toolbar = () => {
  const { state, changeTool } = useCanvasState();

  const onSelectTool = (tool: ToolType) => {
    changeTool(tool);
  }

  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white p-1.5 flex gap-y-1 flex-col items-center shadow-sm">
        {
          <Tools key={"read-only"} tools={ReadOnlyTools} selectedTool={state.tool} onSelect={onSelectTool} />
        }
        {hasEditPermissions(state.permission) &&
          (<Tools key={"read-write"} tools={ReadWriteTools} selectedTool={state.tool} onSelect={onSelectTool} />)
        }
      </div>

      {hasEditPermissions(state.permission) &&
        <UndoRedoToolbar activeTool={state.tool} />
      }
    </div>
  );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] bg-white -translate-y-[50%] left-2 flex flex-col gap-y-4 w-12 h-[300px]">
      <Skeleton className="h-full w-full bg-muted" />
    </div>
  )
}


