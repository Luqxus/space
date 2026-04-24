import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Plus className="h-4 w-4" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogTitle />
      <DialogContent className="p-0 bg-transparent border-none w-[880px] [&>button]:hidden">
        <OrganizationProfile
          routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border-none w-full"
            }
          }}>
          <OrganizationProfile.Page label="members" />
          <OrganizationProfile.Page label="general" />
        </OrganizationProfile>
      </DialogContent>
    </Dialog>
  );
};
