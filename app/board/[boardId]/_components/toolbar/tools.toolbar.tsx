
import { CanvasMode } from "../../types/canvas";
import { Tool, ToolType } from "../../types/tools";

import { ToolButton } from "./button.toolbar";

type ToolsProps = {
  tools: Tool[],
  disabled?: ToolType[],
  selectedTool: ToolType,
  onSelect: (toolType: ToolType) => void;
}

export const Tools = (props: ToolsProps) => {

  return (<>
    {
      props.tools.map(tool => {
        return (
          <ToolButton
            key={tool.type}
            type={tool.type}
            icon={tool.icon}
            isActive={props.selectedTool === tool.type}
            isDisabled={props.disabled?.includes(tool.type)}
            onClick={() => {
              props.onSelect(tool.type);
            }}
          />
        );
      })
    }
  </>
  );
}
