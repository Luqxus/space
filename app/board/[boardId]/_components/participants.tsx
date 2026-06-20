'use client';
import { Skeleton } from "@/components/ui/skeleton"
import { useOthers, useSelf } from "@liveblocks/react";
import { UserAvatar } from "./user-avatar";
import { TabSeperator } from "./tab-separator";


const MAX_SHOWN_USERS = 3

const OtherUsers = () => {
  const otherUsers = useOthers();
  const reachedShownUserLimit = otherUsers.length > MAX_SHOWN_USERS;

  if (otherUsers?.length < 1) {
    return <></>
  }

  return (
    <div className="flex items-center gap-x-2">
      {otherUsers.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
        return (
          <UserAvatar
            imageUrl={info.picture}
            name={info.name}
            fallback={info?.name?.[0] ?? "A"} />
        );
      })}

      {reachedShownUserLimit &&
        <UserAvatar
          name={`${otherUsers.length - MAX_SHOWN_USERS} more`}
          fallback={`+${otherUsers.length - MAX_SHOWN_USERS}`} />
      }

      <TabSeperator />
    </div>
  );
}

export const Participants = () => {
  const currentUser = useSelf();

  return (
    <div className="absolute top-2 right-2 bg-white p-3 h-12 flex items-center gap-x-1 shadow-sm">
      <OtherUsers />

      {currentUser && (
        <UserAvatar
          imageUrl={currentUser.info.picture}
          name={currentUser.info.name}
          fallback={currentUser.info.name[0]}
          borderColor="red" />

      )}
    </div>
  )
}

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute top-2 right-2 bg-white  h-12 flex items-center w-[100px]">
      <Skeleton className="h-full w-full bg-muted" />
    </div>
  )
}
