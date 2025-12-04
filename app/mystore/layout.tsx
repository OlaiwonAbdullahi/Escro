import { SidebarProvider } from "@/components/ui/sidebar";
import StoreSidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <StoreSidebar />
      <div className="flex-1 flex flex-col w-full">
        <Navbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
