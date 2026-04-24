import { SearchParams } from "../types/filter-params";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Empty } from "./empty";
import { Button } from "@/components/ui/button";

type BoardListProps = {
  organizationId?: string;
  filterQueryParams: SearchParams
}

export const BoardList = (props: BoardListProps) => {
  const router = useRouter();
  const data = useQuery(api.boards.get, { orgId: props.organizationId!, filter: props.filterQueryParams.search, favorites: props.filterQueryParams.favorites })
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation((api.board.create));

  const onCreateBoard = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: 'Untitled'
    }).then(id => {
      toast.success('Board created');
      router.push(`/board/${id}`);
    }).catch(_ => {
      toast.error('Failed to create board')
    });
  }


  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl flex justify-between items-center">
          {(props.filterQueryParams.favorites) ? 'Favorite Boards' : (props.filterQueryParams.search) ? 'Search Results' : 'Team Boards'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton onClick={onCreateBoard} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (data?.length === 0 && props.filterQueryParams.favorites) {
    return (
      <Empty
        title="No favorites found"
        subtitle="Star boards to add to favorites"
        placeholderImage="/empty.webp"
      />
    );
  }

  if (data?.length === 0 && props.filterQueryParams.search) {
    return (
      <Empty
        title="No result found"
        subtitle="Search for something else"
        placeholderImage="/empty.webp"
      />
    )
  }

  if (data?.length === 0) {
    return (
      <Empty
        title="No Board in Organization"
        subtitle="Create Board to get started"
        placeholderImage="/empty.webp"
      >
        <Button
          variant='default'
          size='lg'
          onClick={onCreateBoard}
          disabled={pending}
        >
          Create board
        </Button >
      </Empty>
    )
  }

  return (
    <div>
      <h2 className="text-3xl flex justify-between items-center">
        {(props.filterQueryParams.favorites) ? 'Favorite Boards' : (props.filterQueryParams.search) ? 'Search Results' : 'Team Boards'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton onClick={onCreateBoard} disabled={pending} />
        {
          data?.map(board => (
            <BoardCard
              key={board._id}
              board={board}
            />
          ))
        }
      </div>
    </div>
  );
}
