'use client'
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { OrgItem } from "./org-item";

export const OrgList = () => {
  const { organization } = useOrganization();
  const { userMemberships, setActive } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  });

  const onOrgClick = (_id: string) => {
    if (!setActive) return;
    setActive({ organization: _id });
  };

  if (!userMemberships.data?.length) return null

  return (
    <ul className="space-y-4">
      {
        userMemberships.data?.map(mem => (
          <OrgItem
            key={mem.organization.id}
            id={mem.organization.id}
            imageUrl={mem.organization.imageUrl}
            name={mem.organization.name}
            isActive={organization?.id === mem.organization.id}
            onOrgClick={onOrgClick}
          />
        ))
      }
    </ul>
  )
}
