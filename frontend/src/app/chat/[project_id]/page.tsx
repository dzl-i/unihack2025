"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar as ShadcnSidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarContent } from "../SidebarContent";
import { Button } from "@/components/ui/button";
import { Loader, TrendingUp } from "lucide-react";
import { Suspense, useState } from "react";
import DocumentViewerSidebar from "../DocumentViewerSidebar";
import useQuery from "@/hooks/useRequest";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import ChatWidget from "../ChatWidget";
import { DataSource } from "../DataSourcesList";

export default function Page() {
  const router = useRouter();

  // Load project details
  const params = useParams<{ project_id: string }>();
  const projectId = params.project_id;
  const { error } = useQuery(`/project/${projectId}`);

  // Handle file viewer
  const [selectedFile, setSelectedFile] = useState<DataSource | undefined>(
    undefined
  );

  // TODO: Go back to landing page
  if (error) {
    toast("There's something wrong. Please try again.");
    router.push("/");
  }

  return (
    <SidebarProvider className="overflow-hidden">
      <ShadcnSidebar>
        <Suspense
          fallback={
            <div className="flex justify-center items-center w-full h-full">
              <Loader className="animate-spin w-6 h-6" />
            </div>
          }
        >
          <SidebarContent
            projectId={projectId}
            setSelectedFile={setSelectedFile}
          />
        </Suspense>
      </ShadcnSidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 pr-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 size-8" />
            <Separator orientation="vertical" />
            <h1>Chat with CollabAI</h1>
          </div>
          <Button variant="outline">
            <TrendingUp />
            Graph View
          </Button>
        </header>
        <ChatWidget projectId={projectId} />
      </SidebarInset>
      {selectedFile && (
        <DocumentViewerSidebar
          file={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      )}
    </SidebarProvider>
  );
}
