import { Sidebar } from "./Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>{/* Main content/chatbot */}</SidebarInset>
    </SidebarProvider>
  );
}
