'use client'
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { ReactNode } from "react";

type RoomProps = {
  children: React.ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode>
}

export const Room = (props: RoomProps) => {
  return (
    <RoomProvider id={props.roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={props.fallback}>
        {() => props.children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
