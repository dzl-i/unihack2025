"use client";

import { Separator } from "@/components/ui/separator";
import { Sidebar } from "./Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Loader, TrendingUp } from "lucide-react";
import { getFileViewerLink } from "@/lib/utils";
import IFrame from "./Iframe";
import { Suspense, useState } from "react";

export default function Page() {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 pr-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 size-8" />
            <Separator orientation="vertical" />
            <h1>Yippee</h1>
          </div>
          <Button variant="outline">
            <TrendingUp />
            Graph View
          </Button>
        </header>
        {/* Main content/chatbot */}
        {/* {selectedFileUrl ? (
          <IFrame
            className="h-full"
            fallback={
              <div className="flex justify-center items-center w-full h-full">
                <Loader className="animate-spin w-6 h-6" />
              </div>
            }
            src={getFileViewerLink(selectedFileUrl)}
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full text-muted-foreground">
            Select a file to view
          </div>
        )} */}
      </SidebarInset>
    </SidebarProvider>
  );
}
