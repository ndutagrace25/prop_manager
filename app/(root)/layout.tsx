import SideMenu from "@/components/shaired/SideMenu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="flex h-screen overflow-hidden"
    >
      {/* Sidebar container - adjust width appropriately */}
      <div className="hidden md:block w-64 flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="h-full overflow-y-auto">
          <SideMenu />
        </div>
      </div>

      {/* Mobile view - sidebar trigger and main content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <div className="md:hidden p-4 border-b border-gray-200">
          <SidebarTrigger />
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
