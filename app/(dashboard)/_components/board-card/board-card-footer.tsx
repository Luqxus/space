import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type BoardCardProps = {
  title: string;
  author: string;
  createdAt: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  disabled: boolean;
};

export const BoardCardFooter = (props: BoardCardProps) => {

  const handleToggleFavorites: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
    props.onToggleFavorite();
  }
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
        {props.title}
      </p>
      <p className="text-[11px] text-muted-foreground truncate">
        {props.author} {'•'} {props.createdAt}
      </p>
      <button
        disabled={props.disabled}
        onClick={handleToggleFavorites}
        className={cn(
          "absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          props.disabled && "cursor-not-allowed opacity-75"
        )}>
        <Star
          className={
            cn("h-4 h-4", props.isFavorite && "fill-blue-600 text-blue-600")
          } />
      </button>
    </div >
  )
}
