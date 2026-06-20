'use client';
import { useState, useRef, ElementRef } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { TabSeperator } from "./tab-separator";
import { Hint } from "@/components/ui/hint";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

const font = Poppins({
  subsets: ['latin'],
  weight: '600'
})

type InfoProps = {
  boardId: string
}


type BoardTitleProps = {
  title: string;
  isEditing: boolean;
  disableEditing: () => void;
  enableEditing: () => void;
  onSubmit: (title: string | undefined) => void;
}

const BoardTitle = (props: BoardTitleProps) => {
  const inputRef = useRef<ElementRef<"input">>(null);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      props.disableEditing();
    }
  };

  const enableEditing = () => {
    props.enableEditing();
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  }

  return (<>{
    props.isEditing ? (
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(inputRef.current?.value?.trim())
      }}
        className="ml-2" >
        <Input
          ref={inputRef}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          defaultValue={props.title}
          className={cn(
            "font-semibold text-xl px-1 h-7 w-[200px] bg-transparent",
            font.className
          )}
        />
      </form >
    ) : (
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant="ghost"
          className="text-base font-normal px-2"
          onClick={enableEditing}
        >
          <p className={cn(
            "font-semibold text-lg text-black",
            font.className
          )}>
            {props.title}
          </p>
        </Button>
      </Hint>
    )
  }</>)
}

export const Info = (props: InfoProps) => {
  const { mutate } = useApiMutation(api.board.update);
  const data = useQuery(api.board.get, {
    id: props.boardId as Id<"boards">
  });

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => setIsEditing(false);

  const onSubmit = (newTitle: string | undefined) => {
    if (!newTitle || newTitle === data?.title) {
      disableEditing();
      return;
    }

    mutate({ id: props.boardId as Id<"boards">, title: newTitle })
      .then(_ => {
        toast.success('Board title updated');
      }
      )
      .catch(err => toast.error(err));

    disableEditing();
  };


  if (!data) return (<Info.Keleton />)

  return (
    <div className="absolute top-2 left-2 bg-white px-2 h-12 flex items-center shadow-sm">
      <Button asChild variant={"board"}>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="board logo"
            height={36}
            width={36}
          />
        </Link>
      </Button>
      <TabSeperator />
      <BoardTitle title={data.title} isEditing={isEditing} disableEditing={disableEditing} enableEditing={enableEditing} onSubmit={onSubmit} />
      <TabSeperator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint
            label="Menu"
            side="bottom"
            sideOffset={10}>
            <Button
              size="icon"
              variant="ghost">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions >
    </div >
  );
};

Info.Keleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white h-12 flex items-center w-[300px] ">
      <Skeleton className="h-full w-full bg-muted" />
    </div>
  );

}
