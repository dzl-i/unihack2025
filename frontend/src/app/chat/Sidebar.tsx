"use client";

import * as React from "react";
import { ProfileDropdown } from "./ProfileDropdown";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Loader, User } from "lucide-react";
import { WorkspaceDropdown } from "./WorkspaceDropdown";
import { Suspense } from "react";
import AddCollaboratorsDialog from "./AddCollaboratorsDialog";
import DataSourcesList from "./DataSourcesList";
import Logo from "@/components/logo";

const data = {
  workspaces: [
    {
      name: "Personal",
      icon: User,
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    profilePic: "",
  },
};

export function Sidebar({ onFileSelect }: { onFileSelect: (url: string) => void }) {
  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-4">
        <div className="flex gap-2 mb-2 cursor-default">
          <Logo />
          <p className="font-bold group-data-[collapsible=icon]:hidden text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/75">
            CollabAI
          </p>
        </div>
        <div className="group-data-[collapsible=icon]:hidden">
          <WorkspaceDropdown workspaces={data.workspaces} />
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-0 my-2" />
      <SidebarContent className="p-2">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-full">
                <Loader className="animate-spin w-6 h-6" />
              </div>
            }
          >
            <DataSourcesList onFileSelect={onFileSelect} />
          </Suspense>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="space-y-2 group-data-[collapsible=icon]:hidden p-4">
        <AddCollaboratorsDialog />
        <ProfileDropdown user={data.user} />
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
