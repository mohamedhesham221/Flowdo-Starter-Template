import { Button } from "@/components/ui/button"

import Sidebar from "@/layouts/sections/Sidebar"
import Topbar from "@/layouts/sections/Topbar"
import { useState } from "react"
import { Toaster } from "@/components/ui/sonner"

import {
  ChevronLeft,
  ChevronRight,
  } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Layout({ children, title, item=false, tabs, activeTab="", className="bg-white" }) {
  const storedValue = localStorage.getItem("mini-sidebar");
  const [sidePanel, setSidePanel] = useState(storedValue == 'no');

  // console.log(storedValue);

  const toggleSidePanel = () => {
    localStorage.setItem("mini-sidebar", (storedValue=="yes" ? "no" : "yes"))
    setSidePanel(!sidePanel);
  };

  return (
    <>
    <div className={`grid min-h-screen w-full ${sidePanel ? "md:grid-cols-[16.4rem_1fr] lg:grid-cols-[16.4rem_1fr]" : "md:grid-cols-[4.4rem_1fr] lg:grid-cols-[4.4rem_1fr]"} `}>
      <a id="sidebarToggle" onClick={toggleSidePanel} className="sidebarToggleBtn hidden md:flex">
          {
              sidePanel ?
              <ChevronRight className="ml-[3px]" size={20} />
              :
              <ChevronLeft size={20} />
            }
      </a>
      <Sidebar sidePanel={sidePanel}/>
      <div className="flex flex-col">
        <Topbar title={title} item={item} tabs={tabs} activeTab={activeTab}/>
        
        <main className={cn( tabs ? 'mt-24' : 'mt-14'  ,"font-sans flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 sidebar-light", className ) }>
          {children}
        </main>
      </div>
    </div>
    <Toaster richColors position="top-left" />
    </>
  )
}
