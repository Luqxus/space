'use client'
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { ReactNode } from "react";
import { Layer } from "../types/canvas";

type RoomProps = {
  children: React.ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode>
}

export const Room = (props: RoomProps) => {
  return (
    <RoomProvider id={props.roomId} initialPresence={{ cursor: null, selection: [] }} initialStorage={
      {
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList<string>([])
      }
    }>
      <ClientSideSuspense fallback={props.fallback}>
        {() => props.children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
