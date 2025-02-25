"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Properties",
    url: "properties",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState("");

  // Set active item based on current URL on initial load and URL changes
  useEffect(() => {
    const setActiveFromPath = () => {
      const path = window.location.pathname;
      const currentItem = items.find(
        (item) => item.url !== "#" && path.includes(item.url)
      );
      if (currentItem) {
        setActiveItem(currentItem.title);
      } else {
        // Default to Home if no match found
        setActiveItem("Home");
      }
    };
    // Set initial active item
    setActiveFromPath();

    // Listen for URL changes (helpful for browser back/forward navigation)
    window.addEventListener("popstate", setActiveFromPath);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("popstate", setActiveFromPath);
  }, []);

  const handleItemClick = (title: string) => {
    setActiveItem(title);
  };

  return (
    <Sidebar side="left" className="bg-sidebar-primary">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`transition-colors duration-200 ${
                      activeItem === item.title
                        ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <a
                      href={item.url}
                      onClick={(e) => {
                        // Prevent navigation for demo links or if already on the current page
                        if (
                          item.url === "#" ||
                          window.location.pathname.includes(item.url)
                        ) {
                          e.preventDefault();
                        }
                        handleItemClick(item.title);
                      }}
                      className="flex items-center"
                    >
                      <item.icon
                        className={`mr-2 h-5 w-5 ${
                          activeItem === item.title
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                      <span>{item.title}</span>

                      {/* Active indicator line */}
                      {activeItem === item.title && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r"></div>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideMenu;
