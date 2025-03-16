"use client";

import * as React from "react";
import { ProfileDropdown, User } from "./ProfileDropdown";
import {
  SidebarContent as ShadcnSidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Loader } from "lucide-react";
import { WorkspaceDropdown } from "./WorkspaceDropdown";
import { Suspense } from "react";
import AddCollaboratorsDialog from "./AddCollaboratorsDialog";
import Logo from "@/components/logo";
import useQuery from "@/hooks/useRequest";
import DataSourcesList, { DataSource } from "./DataSourcesList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Message } from "./ChatWidget";

export type Project = {
  code: string;
  isShared: boolean;
  name: string;
  projectId: string;
  users: User[];
  dataSources: DataSource[];
  messages: Message[];
};

export function SidebarContent({
  projectId,
  setSelectedFile,
}: {
  projectId: string;
  setSelectedFile: (file?: DataSource) => void;
}) {
  const router = useRouter();

  // Query data required for sidebar
  const { user } = useAuth();
  const { data: project, error } = useQuery(`/project/${projectId}`);

  // Go back to landing page
  if (error) {
    toast("There's something wrong. Please try again.");
    router.push("/");
  }

  const handleOnWorkspaceChange = (workspaceId: string) => {
    router.push(`/chat/${workspaceId}`);
  };

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex gap-2 mb-2 cursor-default">
          <Logo />
          <p className="font-bold group-data-[collapsible=icon]:hidden text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/75">
            CollabAI
          </p>
        </div>
        <div className="group-data-[collapsible=icon]:hidden">
          <Suspense fallback={<Skeleton className="h-12 w-full" />}>
            <WorkspaceDropdown
              projectId={projectId}
              onWorkspaceChange={handleOnWorkspaceChange}
            />
          </Suspense>
        </div>
      </SidebarHeader>
      <div className="px-4 w-full">
        <div className="h-px bg-input w-full"></div>
      </div>
      <ShadcnSidebarContent className="p-2">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-full">
                <Loader className="animate-spin w-6 h-6" />
              </div>
            }
          >
            <DataSourcesList
              project={project}
              onFileSelected={setSelectedFile}
            />
          </Suspense>
        </SidebarGroup>
      </ShadcnSidebarContent>
      <SidebarFooter className="space-y-2 group-data-[collapsible=icon]:hidden p-4">
        <AddCollaboratorsDialog />
        {user && <ProfileDropdown />}
      </SidebarFooter>
    </>
  );
}
