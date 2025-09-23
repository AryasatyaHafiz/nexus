import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Plus,
  BarChart3 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Add Product", 
    url: "/products/new",
    icon: Plus,
  },
  {
    title: "Analytics",
    url: "/analytics", 
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === path;
    return currentPath.startsWith(path);
  };

  const getNavClasses = (path: string) => {
    const isCurrentlyActive = isActive(path);
    return `transition-smooth hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
      isCurrentlyActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-subtle" 
        : "text-sidebar-foreground"
    }`;
  };

  return (
    <Sidebar className={`border-r border-border ${isCollapsed ? "w-14" : "w-64"}`}>
      <SidebarContent className="bg-gradient-subtle">
        <div className="p-4">
          {!isCollapsed && (
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold">ProductFlow</h1>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(item.url)}
                    >
                      <item.icon className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4 mr-3"}`} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}