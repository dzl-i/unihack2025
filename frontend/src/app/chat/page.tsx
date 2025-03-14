import { Sidebar } from "@/components/chat/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>{/* Main content/chatbot */}</SidebarInset>
    </SidebarProvider>
  );
}
