import { CanvasMode, CanvasState, LayerType } from "@/app/board/[boardId]/types/canvas";
import { CanvasPermissions } from "@/app/board/[boardId]/types/permissions";
import { ToolType } from "@/app/board/[boardId]/types/tools";
import { permission } from "process";
import { createContext, ReactNode, useState } from "react";

const initialCanvasState: CanvasState = (
  {
    mode: CanvasMode.NONE,
    tool: ToolType.SELECT,
    permission: CanvasPermissions.READ_WRITE,
  }
);

type ToolToStateProc = <T extends CanvasState>(currentState: T) => CanvasState;
const ToolToModeMapper: Record<ToolType, ToolToStateProc> = {
  Select: (currentState: CanvasState) => {
    return {
      mode: CanvasMode.NONE,
      tool: ToolType.SELECT,
      permission: currentState.permission
    }
  },
  // Comment: (currentState: CanvasState) => {
  //   return {
  //     mode: CanvasMode.INSERTING,
  //     tool: ToolType.COMMENT,
  //     layerType: LayerType.COMMENT,
  //     permission: currentState.permission
  //   }
  // },

  Type: (currentState: CanvasState) => {
    return {
      mode: CanvasMode.INSERTING,
      tool: ToolType.TYPE,
      layerType: LayerType.TEXT,
      permission: currentState.permission
    }
  },
  Undo: (currentState: CanvasState) => {
    return {
      mode: CanvasMode.NONE,
      tool: ToolType.UNDO,
      permission: currentState.permission
    }
  },
  Redo: (currentState: CanvasState) => {
    return {
      mode: CanvasMode.NONE,
      tool: ToolType.REDO,
      permission: currentState.permission
    }
  },
  Frame: (currentState: CanvasState) => {
    return {
      mode: CanvasMode.INSERTING,
      tool: ToolType.FRAME,
      layerType: LayerType.FRAME,
      permission: currentState.permission
    }
  },
  Rectangle: (currentState: CanvasState) => {
    return {
      mode: CanvasMode.INSERTING,
      tool: ToolType.RECTANGLE,
      layerType: LayerType.RECTANGLE,
      permission: currentState.permission
    }
  },
  Ellipse: (currentState: CanvasState) => {
    return {
      mode: CanvasMode.INSERTING,
      tool: ToolType.ELLIPSE,
      layerType: LayerType.ELLIPSE,
      permission: currentState.permission
    }
  },
  Pencil: (currentState: CanvasState) => {
    return {
      mode: CanvasMode.PENCIL,
      tool: ToolType.PENCILE,
      permission: currentState.permission
    }
  }
} as const


type CanvasStateContextType = {
  state: CanvasState;
  onMutateCanvasState: (state: CanvasState) => void;
  changeTool: (tool: ToolType) => void;
};

export const CanvasStateContext = createContext<CanvasStateContextType | undefined>(undefined)

type CanvasStateProviderProps = {
  children: ReactNode
}
export const CanvasStateProvider = (props: CanvasStateProviderProps) => {
  const [state, setState] = useState<CanvasState>(initialCanvasState);

  const onMutateCanvasState = (newState: CanvasState) => {
    setState(newState);
  }

  const changeTool = (tool: ToolType) => {
    setState({
      ...state,
      ...ToolToModeMapper[tool as keyof typeof ToolToModeMapper](state),
    });
  }

  return (
    <CanvasStateContext.Provider value={{ state, onMutateCanvasState, changeTool }}>
      {props.children}
    </CanvasStateContext.Provider>
  )
}

