import { CanvasStateContext } from "@/providers/canvas-state-provider";
import { useContext } from "react";

export const useCanvasState = () => {
  const context = useContext(CanvasStateContext);
  if (!context) {
    throw new Error("useCanvasState must be used in CanvasStateProvider");
  }
  return context;
}
