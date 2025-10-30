import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconBook, type Icon } from "@tabler/icons-react";
import { Link } from "react-router-dom";

type SideNavData = {
  data: {
    user: {
      name: string | null;
      email: string | null;
      avatar: string | null;
    };
    navMain: {
      title: string;
      url: string;
      icon: Icon | undefined;
    }[];
  };
};
type prop = React.ComponentProps<typeof Sidebar> & SideNavData;

export function AppSidebar({ data, ...props }: prop) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="#">
                <IconBook className="!size-5" />
                <span className="text-base font-semibold">PACE</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
