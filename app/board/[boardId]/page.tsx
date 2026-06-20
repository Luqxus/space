'use client'
import { LiveblocksProvider } from "@liveblocks/react";
import { Canvas } from "./components/Canvas";
import { Room } from "./components/room";
import { use } from "react";

type BoardPageProps = {
  params: Promise<{
    boardId: string
  }>
}


const liveblocksPublicKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!;

const Page = (props: BoardPageProps) => {
  const { boardId } = use(props.params);

  return (

    <LiveblocksProvider publicApiKey={liveblocksPublicKey}>
      <Room roomId={boardId}>
        <Canvas boardId={boardId} />
      </Room>
    </LiveblocksProvider>
  );
}

export default Page;
