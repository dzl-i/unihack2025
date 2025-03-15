"use client";

import * as React from "react";
import { ProfileDropdown } from "./ProfileDropdown";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Loader, User, Users } from "lucide-react";
import { Workspace, WorkspaceDropdown } from "./WorkspaceDropdown";
import { Suspense } from "react";
import AddCollaboratorsDialog from "./AddCollaboratorsDialog";
import Logo from "@/components/logo";
import useQuery from "@/hooks/useRequest";
import DataSourcesList from "./DataSourcesList";
import { DocumentFile } from "./DocumentViewerSidebar";

export function Sidebar({
  setSelectedFile,
}: {
  setSelectedFile: (file?: DocumentFile) => void;
}) {
  const { data: user } = useQuery("/user/profile");
  const { data: workspaces, refetch: refetchWorkspaces } =
    useQuery("/project/list");
  const [activeWorkspace, setActiveWorkspace] = React.useState<
    Workspace | undefined
  >(undefined);

  const normalizedWorkspaces = React.useMemo(
    () =>
      workspaces != null
        ? workspaces.map(
            (workspace: Partial<{ name: string; isShared: boolean }>) => ({
              projectId: workspace.projectId,
              name: workspace.name,
              icon: workspace.isShared ? Users : User,
            })
          )
        : [],
    [workspaces]
  );

  React.useEffect(() => {
    if (normalizedWorkspaces != null && activeWorkspace == null) {
      setActiveWorkspace(normalizedWorkspaces[0]);
    }
  }, [activeWorkspace, normalizedWorkspaces]);

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
            workspaces={normalizedWorkspaces}
            refetchWorkspaces={refetchWorkspaces}
          />
        </div>
      </SidebarHeader>
      <div className="px-4 w-full">
        <div className="h-px bg-input w-full"></div>
      </div>
      <SidebarContent className="p-2">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-full">
                <Loader className="animate-spin w-6 h-6" />
              </div>
            }
          >
            <DataSourcesList onFileSelected={setSelectedFile} />
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
