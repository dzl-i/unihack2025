"use client";

import * as React from "react";
import { ChevronDown, Plus } from "lucide-react";

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
import { Input } from "@/components/ui/input";

export type Workspace = {
  name: string;
  icon: React.ElementType;
};

export function WorkspaceDropdown({ workspaces }: { workspaces: Workspace[] }) {
  const { isMobile } = useSidebar();
  const [activeWorkspace, setActiveWorkspace] = React.useState<Workspace>(
    workspaces[0]
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="border border-foreground/15"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <activeWorkspace.icon className="size-4" />
                </div>
                <span className="truncate font-medium">
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
                  onClick={() => setActiveWorkspace(workspace)}
                  className="gap-2 p-2"
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
                  autoFocus={true}
                ></input>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button variant="default">Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </DropdownMenu>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
