'use client'
import { LiveblocksProvider } from "@liveblocks/react";
import { Canvas } from "./_components/canvas";
import { Room } from "./_components/room";
import { use } from "react";
import { CanvasLoading } from "./_components/canvas-loading";

type BoardPageProps = {
  params: Promise<{
    boardId: string
  }>
}


const liveblocksPublicKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!;

const Page = (props: BoardPageProps) => {
  const { boardId } = use(props.params);

  return (

    <LiveblocksProvider authEndpoint={"../../api/liveblocks-auth"}>
      <Room roomId={boardId} fallback={<CanvasLoading />}>
        <Canvas boardId={boardId} />
      </Room>
    </LiveblocksProvider>
  );
}

export default Page;
