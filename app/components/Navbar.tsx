"use client";

// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import * as Icon from 'react-feather';
// import { DarkModeSwitch } from "react-toggle-dark-mode";
// import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ThemeContext } from "./Provider";
import { SidebarMenu } from "./Sidebar";
import type { SVGProps } from "react";
import { useState } from "react";

import { PanelLeftClose, PanelLeftOpen,Menu } from "lucide-react";

export default function NavbarComponent() {
  const [getMobileView, setMobileView] = useState(true);
  const [getAnimation, setAnimation] = useState(false);

  const router = useRouter();
  const theme = useContext(ThemeContext);
  const { setTheme } = useTheme();

  const onDarkModeToggle = (e: boolean) => {
    setTheme(e ? "dark" : "light");
    theme?.setTheme(e ? "dark" : "light");
  };

  const logout = () => {
    localStorage.removeItem("user");

    router.replace("/");
    router.refresh();
  };

  function RadixIconsNotionLogo(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 15 15"
        {...props}
      >
        <path
          fill="currentColor"
          d="M3.258 3.117c.42.341.577.315 1.366.262l7.433-.446c.158 0 .027-.157-.026-.183l-1.235-.893c-.236-.184-.551-.394-1.155-.341l-7.198.525c-.262.026-.315.157-.21.262zm.446 1.732v7.821c0 .42.21.578.683.552l8.17-.473c.472-.026.525-.315.525-.656V4.324c0-.34-.131-.525-.42-.499l-8.538.499c-.315.026-.42.184-.42.525m8.065.42c.052.236 0 .472-.237.499l-.394.078v5.775c-.341.183-.657.288-.92.288c-.42 0-.525-.131-.84-.525L6.803 7.342v3.911l.815.184s0 .472-.657.472l-1.812.105c-.053-.105 0-.367.184-.42l.472-.13V6.292L5.15 6.24c-.053-.236.078-.577.446-.604l1.944-.13L10.22 9.6V5.978l-.683-.079c-.053-.289.157-.499.42-.525zm-9.93-3.937L9.326.781c.919-.08 1.156-.026 1.733.394l2.39 1.68c.395.288.526.367.526.682v9.212c0 .578-.21.92-.946.971l-8.694.525c-.552.027-.815-.052-1.104-.42l-1.76-2.283c-.315-.42-.446-.735-.446-1.103V2.25c0-.472.21-.866.814-.918"
        ></path>
      </svg>
    );
  }

  return (
    // <header className="top-0 z-50 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white  dark:text-white text-sm py-4">
    <nav
      className="max-w-full w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
      aria-label="Global"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="sm:hidden">
            <Sheet>
              <SheetTrigger className="text-black mt-2 ">
                {" "}
                <div className="pt-5 px-1">
                  {" "}
                  <Menu strokeWidth={1} className="w-4 h-4" />
                  
                </div>
              </SheetTrigger>
              <SheetContent side={"left"} className="w-[300px] sm:w-[340px]">
                <SheetHeader>
                  {/* <SheetTitle className='text-left text-xl font-bold ml-3'>Brand</SheetTitle> */}
                  <SheetDescription>
                    <SidebarMenu
                      mobile={getMobileView}
                      setAnimation={setAnimation}
                      setMobileView={setMobileView}
                    />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* <div className="flex items-center">
                        <DarkModeSwitch
                            className='mr-2 text-white sm:block'
                            checked={theme?.theme === 'dark'}
                            onChange={onDarkModeToggle}
                            size={20} />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <a className="font-medium text-white" href="#" aria-current="page">Username</a>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => logout()} className="text-red-400 py-2">
                                    <span><Icon.LogOut size={15} className="mr-2" /></span> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div> */}
      </div>
    </nav>
    // </header>
  );
}
