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

export default function UserLayout() {
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
        url: "/student",
        icon: IconDashboard,
      },
      {
        title: "Tasks",
        url: "/student/tasks",
        icon: IconListDetails,
      },
      {
        title: "Feedbacks",
        url: "/student/feedbacks",
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
