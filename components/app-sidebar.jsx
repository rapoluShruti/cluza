import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./custom/WorkspaceHistory";
import SideBarFooter from "./custom/SideBarFooter";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <Image src={"/logo.svg"} width={30} height={30} alt="logos" />
        <Button>
          <MessageCircleCode />
          Start New Chats
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-5">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
