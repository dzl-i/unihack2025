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
} from "@/components/ui/sidebar";
import { Loader, User, Users } from "lucide-react";
import { Workspace, WorkspaceDropdown } from "./WorkspaceDropdown";
import { Suspense } from "react";
import AddCollaboratorsDialog from "./AddCollaboratorsDialog";
import Logo from "@/components/logo";
import useQuery from "@/hooks/useRequest";

export function Sidebar() {
  const { data: user } = useQuery("/user/profile");
  const { data: workspaces } = useQuery("/project/list");
  const [activeWorkspace, setActiveWorkspace] = React.useState<
    Workspace | undefined
  >(undefined);

  const normalizedWorkspace = React.useMemo(
    () =>
      workspaces != null
        ? workspaces.map(
            (workspace: Partial<{ name: string; isShared: boolean }>) => ({
              name: workspace.name,
              icon: workspace.isShared ? Users : User,
            })
          )
        : [],
    [workspaces]
  );

  React.useEffect(() => {
    if (normalizedWorkspace != null && activeWorkspace == null) {
      setActiveWorkspace(normalizedWorkspace[0]);
    }
  }, [activeWorkspace, normalizedWorkspace]);

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
          <WorkspaceDropdown
            activeWorkspace={activeWorkspace}
            setActiveWorkspace={setActiveWorkspace}
            workspaces={normalizedWorkspace}
          />
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
            {/* <DataSourcesList /> */}
          </Suspense>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="space-y-2 group-data-[collapsible=icon]:hidden p-4">
        <AddCollaboratorsDialog />
        <ProfileDropdown user={user} />
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
