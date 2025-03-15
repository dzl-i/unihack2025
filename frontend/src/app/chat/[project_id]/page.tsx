"use client";

import { Separator } from "@/components/ui/separator";
import { Sidebar } from "../Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import DocumentViewerSidebar, { DocumentFile } from "../DocumentViewerSidebar";

export default function Page() {
  const [selectedFile, setSelectedFile] = useState<DocumentFile | undefined>({
    name: "Screenshot 2025-03-15 133930.png",
    url: "https://unempluzz-bucket.s3.ap-southeast-2.amazonaws.com/input/Adrian_Resume_2025.pdf?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkcwRQIhAO9mJFwSd5juO5bVvZ%2BE624fljRXScesZZpm8pwhfqLaAiAu%2BHsK8U3JjYKyj7Ei%2FipZqSCV9XbE8SjCt%2FmzVh2qKCrHAwgTEAAaDDg5NzcyMjY2MzYzMyIMMZnXSXf236ONiHM7KqQDzjlwEav1sTetHX63BaXHRVXEov3bBv6wD73cpawqdGe3d%2FcIbGlJ%2BJim5uUihINu2GsEq2JhzYJpsKlXhVZsZMDTtIxw1o8pRB5%2BAWCApGdDhKdHOlPFEbmKZ%2BbZD3SHzm2DFGnD0KzxeUWdLSez9YtlK%2FOlZ5eE%2Bi8ukCAHAxCD5mvWQNoaRL9PCE76HWhnr7NIlDhUoGLy82UWYfivP6leakqEzBq6OIb19Hx%2FfePXtEIS3WDab6b%2Br%2FHVBUiIZ7km2fELr254ZjS4PeC92Ko%2FyC%2BZqKQVHz1RZDcV2mWe9XzisX5uPPCMzSSWUn7UiJYzKNCH57zQwBMXtP2ZJI%2FHOTdChdBlk6Q2F4MJ6bWtMWuiwv59AIjTrtpSJSKMmVUYRP1nlqoF%2Bjk%2BEUZ3uSaLOsAo4SWNphas83T5ihlg%2BFgaLRMZ1XU3EokyAZpuQHE3Zm5LivRtW4gmapAxcuWYHNVfTANqDczZxOZjDZwjRTw%2FrV6BhcCJSxmzBpAY9GgWmtcimQW%2FmzMdJHlT1ry%2Bl3xVGHd916pUeU9hA%2FKnnL06MO3e074GOuQCNPm5thZ1LLOtLvLMeIxZD50EpXUuxVOA%2F6uZPIHvLUP5Cp0iw%2FwkJp7%2FhC1ZgjSs4%2F%2BzgP2X79pIp2A%2BIpV9ZkDpyeGi5YyJafunyIObCrkS%2FYV73La98ulNuvCvFGFHGqirOYvTZG4kfiZII0P8%2FLfzH60kKMx7HEqCBplhUCB0JZly805naTwT1%2BWuUO5CmKFqKUYZWvsb2ZRbVajYIaBBurP5QeAmCj1Farde334Hu6mXu6fDlovN%2FdaJVpuLuyCqD%2BhSqAUuPrS5sCYSAO1AuzJ%2FNy1hOtwik5B4525Ojj48DWhGoBjk3TunvF2W5VPMAe6iwViS576Fj24qX1cQ6wQDa03ORigw7wWD8BKJerKZ22h83bcwBkEID8oODXZVVZQtstRlkxXAu32xAoorsXGiC0FYn3G1wIZ43fqzObgtuQ%2FniEmEeoIsizwJVMZtS2xYprLHfmJ9zDSeisQEVoo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5CBDQYLIXJQ5BQ67%2F20250315%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250315T093008Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=ea0df67eb13a61d2b1a72e1c5958e55fda526b61c6e179bbfa972e4615ac107d",
  });
  const [showDetails, setShowDetails] = useState(true);

  return (
    <SidebarProvider className="overflow-hidden" defaultOpen={false}>
      <Sidebar setSelectedFile={setSelectedFile} />
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
        {/* Main content/chatbot */}
      </SidebarInset>
      {showDetails && selectedFile && (
        <DocumentViewerSidebar
          file={selectedFile}
          setShowDetails={setShowDetails}
        />
      )}
    </SidebarProvider>
  );
}
