'use client'
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Board } from "../../types/board"
import Image from "next/image";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { BoardCardFooter } from "./board-card-footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

type BoardCardProps = {
  board: Board;
}

export const BoardCard = (props: BoardCardProps) => {
  const { mutate, pending } = useApiMutation(api.board.favorite);

  const { userId } = useAuth()
  const authorLabel = userId === props.board.authorId ? 'You' : props.board.authorName;
  const createdAtLabel = formatDistanceToNow(props.board._creationTime, {
    addSuffix: true
  });


  const onToggleFavorite = () => {
    mutate({ id: props.board._id, orgId: props.board.orgId })
      .then(_ => toast.success((props.board.favorite) ? 'Board removed from favorites' : 'Board added to favorites'))
      .catch(_ => toast.error((props.board.favorite) ? 'Failed to remove board from favorites' : 'Failed to add board to favorites'))
  }

  return <Link href={`/board/${props.board._id}`}>
    <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
      <div className="relative flex-1 bg-amber-50">
        <Image
          src={props.board.imageUrl}
          alt={props.board.title}
          fill
          className="object-fit" />
        <Overlay />
        <Actions id={props.board._id} title={props.board.title} side="right" sideOffset={18}>
          <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
          </button>
        </Actions>
      </div>
      <BoardCardFooter
        isFavorite={props.board.favorite ?? false}
        title={props.board.title}
        author={authorLabel}
        createdAt={createdAtLabel}
        onToggleFavorite={onToggleFavorite}
        disabled={pending}
      />

    </div>
  </Link>
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (

    <div className="aspect-[100/127] rounded-lg justify-between overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  )
}
