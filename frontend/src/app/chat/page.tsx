import { Separator } from "@/components/ui/separator";
import { Sidebar } from "./Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export default function Page() {
  return (
    <SidebarProvider>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
