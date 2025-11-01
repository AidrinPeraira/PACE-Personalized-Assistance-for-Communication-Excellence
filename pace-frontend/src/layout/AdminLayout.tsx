import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import {
  IconChartBar,
  IconDashboard,
  IconListDetails,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import type { AuthState } from "@/Features/auth/authTypes";

export default function AdminLayout() {
  let { user } = useSelector((state: { auth: AuthState }) => state.auth);

  const data = {
    user: {
      name: user?.name,
      email: user?.email,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: IconDashboard,
      },
      {
        title: "Tasks",
        url: "/admin/tasks",
        icon: IconListDetails,
      },
      {
        title: "Students",
        url: "/admin/students",
        icon: IconChartBar,
      },
    ],
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar data={data} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
