import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

type CanvasProps = {
  boardId: string
}


export const Canvas = (props: CanvasProps) => {

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={props.boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
};
