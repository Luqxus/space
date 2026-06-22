'use client'
import { LiveblocksProvider } from "@liveblocks/react";
import { Canvas } from "./_components/canvas";
import { Room } from "./_components/room";
import { use } from "react";
import { CanvasLoading } from "./_components/canvas-loading";
import { CanvasStateProvider } from "@/providers/canvas-state-provider";

type BoardPageProps = {
  params: Promise<{
    boardId: string
  }>
}

const liveblocksAuthEndpoint = "../../api/liveblocks-auth";

const Page = (props: BoardPageProps) => {
  const { boardId } = use(props.params);

  return (
    <LiveblocksProvider authEndpoint={liveblocksAuthEndpoint} throttle={16}>
      <Room roomId={boardId} fallback={<CanvasLoading />}>
        <CanvasStateProvider>
          <Canvas boardId={boardId} />
        </CanvasStateProvider>
      </Room>
    </LiveblocksProvider>
  );
}

export default Page;
