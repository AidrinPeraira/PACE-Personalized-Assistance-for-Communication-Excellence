import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { logoutUser } from "@/Features/auth/authThunks";
import { useAppDispatch } from "@/hooks";
import type React from "react";
import { useNavigate } from "react-router-dom";

export function SiteHeader() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function handleLogout(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/login");
  }
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={handleLogout}
            size="sm"
            className="hidden sm:flex"
          >
            LogOut
          </Button>
        </div>
      </div>
    </header>
  );
}
