'use client'

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent
} from "./ui/dropdown-menu";
import { Link2, Trash2, Edit2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModalStore } from "@/store/user-rename-modal.store";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps['side'];
  sideOffset?: DropdownMenuContentProps['sideOffset'];
  id: string;
  title: string;
}

export const Actions = (props: ActionsProps) => {
  const { onOpen } = useRenameModalStore();
  const { mutate, pending } = useApiMutation(api.board.remove);

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/board/${props.id}`
    )
      .then(() => toast.success('Link Copied'))
      .catch(e => toast.error('Failed to copy link'));

  }

  const onDeleteBoard = () => {
    mutate({ id: props.id }).then(_ => {
      toast.success('Board deleted')
    }).catch(_ => {
      toast.error('Failed to delete board')
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {props.children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={props.side}
        sideOffset={props.sideOffset}
        className="w-60"
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>


        <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(props.id, props.title)}>
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>

        <ConfirmModal
          disabled={pending}
          header="Delete board"
          description='This board will be deleted and all of its contents.'
          onConfirm={onDeleteBoard}
        >
          <Button
            variant='ghost'
            className="p-3 w-full text-xs justify-start font-normal cursor-pointer" disabled={pending}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete board
          </Button>
        </ConfirmModal>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
