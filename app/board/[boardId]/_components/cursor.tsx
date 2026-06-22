'use client';

import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";

type CursorProps = {
  connectionId: number
}

export const Cursor = memo((props: CursorProps) => {
  const info = useOther(props.connectionId, (user) => user?.info);
  const cursor = useOther(props.connectionId, (user) => user.presence.cursor);

  const name = info?.name ?? "Anonymous";

  if (!cursor) return null

  const { x, y } = cursor
  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2 className="w-5 h-5"
        style={{
          fill: "orange",
          color: "orange"
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 text-xs text-white font-semibold bg-orange-500">
        {name}
      </div>
    </foreignObject>
  )
});

Cursor.displayName = "Cursor";
