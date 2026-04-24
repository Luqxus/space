import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
interface NewBoardButtonProps {
  onClick: () => void;
  disabled?: boolean
}
export const NewBoardButton = (props: NewBoardButtonProps) => {
  return (
    <button
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        props.disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
      onClick={props.onClick}
      disabled={props.disabled}>
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">Add New Board</p>
    </button>
  )
}
