import { Canvas } from "./components/Canvas";

type BoardPageProps = {
  params: {
    boardId: string
  }
}

const Page = async (props: BoardPageProps) => {
  const { boardId } = await props.params;
  return (
    <>
      <Canvas boardId={boardId} />
    </>
  );
}

export default Page;
