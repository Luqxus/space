import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hint } from "@/components/ui/hint";

type UserAvatarProps = {
  imageUrl?: string;
  name?: string;
  fallback: string;
  borderColor?: string;
}

export const UserAvatar = (props: UserAvatarProps) => {
  return (
    <Hint
      label={props.name ?? "Anonymous"}
      side="bottom"
      sideOffset={10}>
      <Avatar
        className="h-8 w-8 border-2"
        style={{ borderColor: props.borderColor }}>
        <AvatarImage src={props.imageUrl} />
        <AvatarFallback className="text-xm font-semibold">
          {props.fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  )
}
