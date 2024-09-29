import './Sidebar.css'
import { usePage } from '@inertiajs/react'
import { __, trans } from '@/lib/i18n'

import { CalendarMenuIcon, DashboardIcon, DeletedItemsIcon, HRIcon, ProjectIcon, ReportIcon, SettingIcon, TaskIcon, TicketIcon } from '@/assets/svg/icons';
import { PageProps } from "@/types"
import { useRoute } from 'ziggy-js';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, PenSquare, UserPlus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function Sidebar({ sidePanel }) {
  const { locale, app, ziggy, auth } = usePage().props;
  const route = useRoute();

  console.log(auth);

  const activeModule = route().current();

  interface App {
    logo: string;
  }

  return (
    <div className={` bg-[#f7faff] border-[#e8eef3] hidden ltr:border-r rtl:border-l md:block h-full w-full  transition-all duration-200 ${sidePanel ? "max-w-[16.4rem]" : "max-w-[4.4rem]"}`}>
      <div className='bg-[#f7faff]'>
        <div className="flex h-full max-h-screen flex-col">
          <div className={`flex-1 grid ${sidePanel ? "grid-cols-[4.4rem_1fr]" : ""}`}>
            <nav className="flex flex-col items-center justify-between border-[#e8eef3] ltr:border-r rtl:border-l pt-[17px] sidebar-menu">
              <div className="flex flex-col items-center justify-start w-full">
                <a href="/" className="flex items-end justify-center mb-4 mt-2 font-semibold ">
                  <img src={(app as App).logo} className="h-10 w-10 rounded-xl" />
                </a>
                <ScrollArea dir='rtl' className="h-[calc(100vh-250px)] max-h- w-full">
                  <div className="flex flex-col justify-center items-center my-2">
                    <a href={'#'} className=" flex flex-col items-center justify-center p-1.5 rounded-2xl hover:text-primary  hover:bg-[#0588691a]" >
                      <DashboardIcon />
                    </a>
                    <span className="text-[10px] mt-0.5 text-[#616e80]">{__('app.menu.dashboard2')}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center my-2">
                    <a href={'#'}
                      className=" flex flex-col items-center justify-center p-1.5 rounded-2xl hover:text-primary  hover:bg-[#0588691a]"
                    >
                      <HRIcon />
                    </a>
                    <span className="text-[10px] mt-0.5 text-[#616e80]">{__('app.menu.hr2')}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center my-2">
                    <a href={'#'}
                      className={cn(" flex flex-col items-center justify-center p-1.5 rounded-2xl hover:text-primary  hover:bg-[#0588691a]",
                        activeModule?.includes('projects') && "bg-[#0588691a] active"
                      )}
                    >
                      <ProjectIcon />
                    </a>
                    <span className={cn("text-[10px] mt-0.5 text-[#616e80]", activeModule?.includes('projects') && "text-[#058869]")}>{__('app.menu.projects')}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center my-2">
                    <a href={'#'}
                      className={cn(" flex flex-col items-center justify-center p-1.5 rounded-2xl hover:text-primary  hover:bg-[#0588691a]",
                        activeModule?.includes('tasks') && "bg-[#0588691a] active"
                      )}
                    >
                      <TaskIcon />
                    </a>
                    <span className={cn("text-[10px] mt-0.5 text-[#616e80]", activeModule?.includes('tasks') && "text-[#058869]")}>{__('app.menu.tasks')}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center my-2">
                    <a href={'#'} className=" flex flex-col items-center justify-center p-1.5 rounded-2xl hover:text-primary  hover:bg-[#0588691a]" >
                      <CalendarMenuIcon />
                    </a>
                    <span className="text-[10px] mt-0.5 text-[#616e80]">{__('app.menu.Events')}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center my-2">
                    <a href={route('tickets.index')} className=" flex flex-col items-center justify-center p-1.5 rounded-2xl hover:text-primary  hover:bg-[#0588691a]" >
                      <TicketIcon />
                    </a>
                    <span className="text-[10px] mt-0.5 text-[#616e80]">{__('app.menu.tickets2')}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center my-2">
                    <a href={'#'} className=" flex flex-col items-center justify-center p-1.5 rounded-2xl hover:text-primary  hover:bg-[#0588691a]" >
                      <DeletedItemsIcon />
                    </a>
                    <span className="text-[10px] mt-0.5 text-[#616e80]">{__('app.menu.deletedRecords')}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center my-2">
                    <a href={'#'} className=" flex flex-col items-center justify-center p-1.5 rounded-2xl hover:text-primary  hover:bg-[#0588691a]" >
                      <ReportIcon />
                    </a>
                    <span className="text-[10px] mt-0.5 text-[#616e80]">{__('app.menu.reports')}</span>
                  </div>

                </ScrollArea>
              </div>

              <div className="flex flex-col items-center justify-start my-6">
                <div className="flex flex-col justify-center items-center my-2">
                  <a href={'#'} className=" flex flex-col items-center justify-center p-1.5 rounded-2xl hover:text-primary  hover:bg-[#0588691a]" >
                    <SettingIcon />
                  </a>
                  <span className="text-[10px] mt-0.5 text-[#616e80]">{__('app.menu.settings')}</span>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <div className="ring-offset-2 ring-2 ring-[#CBA53A] mt-3.5 rounded-full">
                      <img src={auth && auth['user']['user']['image_url']} className="w-8 h-8 rounded-full" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent sideOffset={4} side='left' align='end'>
                    <div className="flex flex-col max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg s" dir="rtl">
                      <div className="flex items-center mb-6">
                        <Avatar className="h-9 w-9 ml-4">
                          <AvatarImage src={auth && auth['user']['user']['image_url']} alt={auth && auth['user']['user']['name']} />
                          <AvatarFallback>م</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-sm font-bold text-right">{auth && auth['user']['user']['name']}</h2>
                          <p className="text-sm text-gray-500">{auth && auth['user']['user']['employee_detail']['designation']['name']}</p>
                        </div>
                        <a href={'#'} className="mr-auto">
                          <PenSquare className="h-4 w-4 text-gray-500" />
                        </a>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">إرسال دعوة لتسجيل الدخول</span>
                          <UserPlus className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">الوضع الداكن</span>
                          <Switch dir='ltr'/>
                        </div>
                        <a href={'#'} className="flex items-center justify-between text-red-500">
                          <span className="text-sm">تسجيل خروج</span>
                          <LogOut className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

              </div>
            </nav>
            <div className={`pt-4 ${sidePanel ? "" : "hidden"} transition-all duration-500`}>
              <div className={`flex items-center border-b px-4 mb-4 h-[47px] ${sidePanel ? "" : "hidden"}`}>
                <span className="text-[18px] font-bold ">{__('app.menu.projects')}</span>
              </div>
              <ul>
                <li className="">
                  <a className={cn("nav-item text-[13px] hover:text-primary", activeModule?.includes('projects') && "active")} href={'#'} title={__('app.menu.projects')}>
                    <span className="pl-3">{__('app.menu.projects')}</span>
                  </a>
                </li>
                <li className="">
                  <a className={cn("nav-item text-[13px] hover:text-primary", activeModule?.includes('tasks') && "active")} href={'#'} title={__('app.menu.tasks')}>
                    <span className="pl-3">{__('app.menu.tasks')}</span>
                  </a>
                </li>
                {/* <li className="">
                  <a className="nav-item text-[13px]" href="http://127.0.0.1:8000/account/projects" title="المساحات">
                    <span className="pl-3">السجلات الزمنية</span>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
          {/* <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
}