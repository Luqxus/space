'use client'
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";

type RoomProps = {
  children: React.ReactNode;
  roomId: string;
}

export const Room = (props: RoomProps) => {
  return (
    <RoomProvider id={props.roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => props.children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
