
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  SquarePlus,
  Users,
} from "lucide-react"

import { SearchIcon, AddCircleIcon, ChatBubbleIcon, NoteIcon, RingIcon } from "@/assets/svg/icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import "./Topbar.css"

import { usePage } from '@inertiajs/react'
import { __ } from '@/lib/i18n'
import { useRoute } from 'ziggy-js';
import { DashboardIcon, HRIcon, ProjectIcon, ReportIcon, SettingIcon } from '@/assets/svg/icons';
import { useMediaQuery } from "@/hooks/use-media-query"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { getUnreadNotifications, searchStore } from "@/api/global"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function Topbar({ title, item, tabs = false, activeTab = "" }) {

  const { data, locale, app, ziggy } = usePage().props;
  const route = useRoute();
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [notifications, setNotifications] = useState([1]);

  const [search, setSearch] = useState({ type: "", text: "" });

  interface App {
    logo: string;
    name: string;
  }



  const handleSearchSubmit = async () => {
    let res = await searchStore({ module: search.type, keyword: search.text });
    window.location.href = res.url;
    // res.status == 'success' ? toast.success(res.message) : toast.error(res.message);
  }

  const getNotifications = async () => {

    let res = await getUnreadNotifications();
    console.log(res);
    if(res.status == "success") {
      setNotifications([...res.notifications]);
    }


  }

  return (
    <>
      <header className="flex flex-col justify-center fixed">
        <div className="flex items-center h-14 gap-4 border-b bg-white px-4 lg:h-[63px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">عرض القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a
                  href="#"
                  className="flex items-center gap-2 my-4 text-lg font-semibold"
                >
                  <img src={(app as App).logo} className="h-6 w-6 rounded-xl" />
                  <span className="">{(app as App).name}</span>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <DashboardIcon />
                  {__('app.menu.dashboard2')}
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <HRIcon />
                  {__('app.menu.hr2')}
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <ProjectIcon />
                  {__('app.menu.projects')}
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <ReportIcon />
                  {__('app.menu.reports')}
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <SettingIcon />
                  {__('app.menu.settings')}
                </a>
              </nav>
              {/* <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div> */}
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <h1 className="text-[18px] font-bold tracking-tight text-gray-900">{title}</h1>
          </div>
          {
            isDesktop ?
              <div className="flex">
                <div className="mx-[11px]">
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>

                        <Dialog>
                          <DialogTrigger>
                            <a>
                              <SearchIcon />
                            </a>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>البحث العام</DialogTitle>
                            </DialogHeader>
                            <div className="flex items-center">
                              <Select value={search.type} onValueChange={(value) => setSearch({ ...search, type: value })} dir="rtl">
                                <SelectTrigger className="w-[180px] rounded-l-none">
                                  <SelectValue placeholder="اختر القسم" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="project">{__('app.project')}</SelectItem>
                                  <SelectItem value="employee">{__('app.employee')}</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input value={search.text} onChange={(e) => setSearch({ ...search, text: e.target.value })} type="text" placeholder={__('placeholders.search')} className="rounded-r-none" />
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant={"secondary"} className="ml-2" >{__('app.cancel')} </Button>
                              </DialogClose>
                              <Button onClick={handleSearchSubmit}>{__('app.search')}</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black shadow-sm">
                        <p>{__('app.search')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>
                <div className="mx-[11px]">
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <a href={'#'}>
                          <NoteIcon />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black shadow-sm">
                        <p>{__('app.menu.stickyNotes')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>
                <div className="mx-[11px]">
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <DropdownMenu dir="rtl">
                          <DropdownMenuTrigger><a>
                            <AddCircleIcon />
                          </a></DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <a href={'#'} className="flex items-center">
                                <SquarePlus size={16} strokeWidth="1" className="ml-1" />
                                <span>{__('app.addProject')}</span>
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <a href={'#'} className="flex items-center">
                                <SquarePlus size={16} strokeWidth="1" className="ml-1" />
                                <span>{__('app.addTask')}</span>
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <a href={'#'} className="flex items-center">
                                <SquarePlus size={16} strokeWidth="1" className="ml-1" />
                                <span>{__('app.addEmployee')}</span>
                              </a>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>


                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black shadow-sm">
                        <p>{__('app.createNew')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>
                <div className="mx-[11px]">
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <a href={'#'}>
                          <ChatBubbleIcon />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black shadow-sm">
                        <p>{__('app.menu.messages')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>
                <div className="mr-3 ml-2">
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <a href={'#'} className="relative">
                          <RingIcon />
                          <Badge variant={"destructive"} className="text-[8px] absolute -top-2 left-0 leading-none rounded-md p-[2px] m-0">{data && data["unreadNotificationCount"]}</Badge>
                        </a>

                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black shadow-sm">
                        <p>{__('app.newNotifications')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>
              </div> :

              <></>

          }


        </div>

      </header>

    </>
  );
}