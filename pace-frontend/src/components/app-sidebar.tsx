import { Link, useLocation } from "react-router-dom";
import { Home, CalendarDays, Users } from "lucide-react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/admin/home", icon: <Home size={18} /> },
    { name: "Daily Task", path: "/daily-task", icon: <CalendarDays size={18} /> },
    { name: "Students", path: "/students", icon: <Users size={18} /> },
  ];

  return (
    <Sidebar>
      <SidebarContent className="p-4">
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all
                  ${
                    location.pathname === link.path
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </SidebarContent>
    </Sidebar>
  );
}
