import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import { Ellipse, Frame, LucideIcon, MessageCircle, MousePointer2, Pencil, Redo, Shapes, Type, Undo } from "lucide-react";
import { useState } from "react";
import { ReadOnlyTools, ReadWriteTools, Tool, ToolType, UndoRedoTools } from "./tools";

enum BoardPermissions {
  READ_ONLY = "ReadOnly",
  READ_WRITE = "ReadWrite",
  ADMIN = "Admin"
}

type ToolsProps = {
  tools: Tool[],
  disabled?: ToolType[]
}

const Tools = (props: ToolsProps) => {
  const [activeTool, setActiveTool] = useState(ToolType.SHAPES);

  const onSelectTool = (shape: ToolType) => {
    setActiveTool(shape)
  }

  return (<>
    {
      props.tools.map(tool => {
        return (
          <ToolButton
            type={tool.type}
            icon={tool.icon}
            isActive={activeTool === tool.type}
            isDisabled={props.disabled?.includes(tool.type)}
            onClick={() => {
              onSelectTool(tool.type);
            }}
          />
        )
      })
    }
  </>
  );
}

export const Toolbar = () => {
  const disabledTools = [ToolType.SELECT];

  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white p-1.5 flex gap-y-1 flex-col items-center shadow-sm">
        {
          <Tools tools={ReadOnlyTools} />
        }
        {hasEditPermissions() &&
          (<Tools tools={ReadWriteTools} />)
        }
      </div>

      <div className="bg-white p-1.5 flex flex-col items-center shadow-md">
        {hasEditPermissions()
          && (
            <Tools tools={UndoRedoTools} />
          )
        }
      </div>
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

function hasEditPermissions() {
  const boardPermissions = [BoardPermissions.READ_WRITE, BoardPermissions.ADMIN];
  return boardPermissions.some((permission) => permission === BoardPermissions.ADMIN || permission === BoardPermissions.READ_WRITE);
}



