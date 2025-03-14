"use client";

import * as React from "react";
import { ProfileDropdown } from "@/components/chat/ProfileDropdown";
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
import { Button } from "../ui/button";
import { Suspense } from "react";
import AddCollaboratorsDialog from "./AddCollaboratorsDialog";
import DataSourcesList from "./DataSourcesList";

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

export function Sidebar({
  ...props
}: React.ComponentProps<typeof ShadcnSidebar>) {
  return (
    <ShadcnSidebar
      collapsible="icon"
      className={`${props.className} p-3`}
      {...props}
    >
      <SidebarHeader>
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold group-data-[collapsible=icon]:hidden">
            AppName
          </p>
          <SidebarTrigger />
        </div>
        <div className="group-data-[collapsible=icon]:hidden">
          <WorkspaceDropdown workspaces={data.workspaces} />
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-0 my-2" />
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-full">
                <Loader className="animate-spin w-6 h-6" />
              </div>
            }
          >
            <DataSourcesList />
          </Suspense>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="space-y-2 group-data-[collapsible=icon]:hidden">
        <AddCollaboratorsDialog />
        <ProfileDropdown user={data.user} />
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
