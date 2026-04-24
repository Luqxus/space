'use client'
import { useOrganization } from "@clerk/nextjs";
import { BoardList } from "./_components/board-list";
import { useSearchParams } from "next/navigation";



const DashboardPage = () => {
  const { organization } = useOrganization();

  const searchParam = useSearchParams();
  const filterParams = Object.fromEntries(searchParam.entries());

  if (!organization) {
    return <div className="flex items-center justify-center">
      Not part of an organization
    </div>
  }

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      <BoardList
        organizationId={organization?.id}
        filterQueryParams={filterParams}
      />
    </div>
  );
};

export default DashboardPage;
