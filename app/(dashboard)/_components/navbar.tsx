'use client'

import { OrganizationSwitcher, useOrganization, UserButton } from "@clerk/nextjs";
import { SearchFilterInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
  const { organization } = useOrganization();
  return (
    <div className="flex items-center p-5 w-full">
      <div className="flex-1" />

      <div className="flex justify-center">
        <div className="hidden lg:flex">
          <SearchFilterInput />
        </div>
        <div className="block lg:hidden flex-1">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: "376px"
                },
                organizationSwitcherTrigger: {
                  padding: '6px',
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: 'white',
                },
              },
            }} />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end gap-x-2">
        {!!organization && (<InviteButton />)}
        <UserButton />
      </div>
    </div>
  );
};
