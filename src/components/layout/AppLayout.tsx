import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus token
    navigate("/login"); // redirect ke login page
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border bg-white/50 backdrop-blur-sm px-6">
            <SidebarTrigger className="transition-smooth hover:bg-muted" />

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Welcome back to ProductFlow
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-500 border-red-300 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </header>

          <main className="flex-1 p-6">
            <Outlet /> {/* halaman anak (dashboard, produk, dll) */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
