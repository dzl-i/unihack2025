"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation"; // Add this import

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { request } from "@/hooks/useRequest";
import { toast } from "sonner";

export type Workspace = {
  name: string;
  icon: React.ElementType;
  projectId: string;
};

export function WorkspaceDropdown({
  activeWorkspace,
  setActiveWorkspace,
  workspaces,
  refetchWorkspaces,
}: {
  activeWorkspace: Workspace | undefined;
  setActiveWorkspace: (workspace: Workspace | undefined) => void;
  workspaces: Workspace[];
  refetchWorkspaces: () => void;
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isReadyToSubmit = useMemo(() => input.length > 0, [input]);

  if (activeWorkspace == null) {
    return null;
  }

  const handleWorkspaceChange = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
    router.push(`/chat/${workspace.projectId}`);
  };

  const createProject = async (name: string) => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await request("POST", "/project", {
        name,
      });

      if (error) {
        setError(error);
        return;
      }

      setOpen(false);
      refetchWorkspaces();

      // If we get back the new project ID, navigate to it
      if (data && data.projectId) {
        router.push(`/chat/${data.projectId}`);
      }

      toast("Project created!", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="border border-foreground/15"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <activeWorkspace.icon className="size-4" />
                </div>
                <span className="truncate font-medium capitalize">
                  {activeWorkspace.name}
                </span>
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Projects
              </DropdownMenuLabel>
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.name}
                  onClick={() => handleWorkspaceChange(workspace)}
                  className="gap-2 p-2 capitalize"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <workspace.icon className="size-3.5 shrink-0" />
                  </div>
                  {workspace.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DialogTrigger className="w-full">
                <DropdownMenuItem className="gap-2 p-2">
                  <Plus className="size-4" />
                  <div className="text-muted-foreground">Add project</div>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Yippee</DialogTitle>
                <DialogDescription>ts pmo icl</DialogDescription>
              </DialogHeader>
              <div className="grid w-full max-w-sm items-center gap-2 my-2">
                <input
                  type="text"
                  id="project-name"
                  className="bg-foreground/5 px-4 py-2 rounded-lg border broder-foreground/15 outline-none"
                  placeholder="Enter project name..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus={true}
                ></input>
                <p className="text-destructive">{error}</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button
                  variant="default"
                  onClick={() => createProject(input)}
                  disabled={!isReadyToSubmit || isLoading}
                  className="bg-purple-gradient-right hover:opacity-85 transition:opacity"
                >
                  {isLoading ? "Creating..." : "Create Project"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </DropdownMenu>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
