import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { LucideIcon } from "lucide-react";
import { CanvasMode } from "../../types/canvas";
import { useCanvasState } from "@/hooks/use-canvas-state";
import { ToolType } from "../../types/tools";



type ToolButtonProps = {
  type: ToolType;
  icon: LucideIcon;
  onClick: () => void;
  isActive: boolean;
  isDisabled?: boolean;
}

export const ToolButton = (props: ToolButtonProps) => {

  return (
    <Hint
      label={props.type}
      side="right"
      sideOffset={14}>
      <Button
        disabled={props.isDisabled}
        size="icon"
        variant={props.isActive ? "secondary" : "ghost"}
        onClick={props.onClick}>
        <ToolButtonIcon icon={props.icon} />
      </Button>
    </Hint>
  );
}

const ToolButtonIcon = ({
  icon: Icon
}: { icon: LucideIcon }) => {
  return (<Icon />)
}
