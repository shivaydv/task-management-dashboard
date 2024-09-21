"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  ListTodo,
  LogOut,
  Moon,
  Sun,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const { setBoardView, boardView,user,setUser,setTasks } = useStore();
  const {toast} = useToast();
  const handleLogout=()=>{
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      variant: "destructive",
      duration: 2000,
    });
    setUser(null)
    setTasks([])
  }

  return (
    <div className={`bg-background border-r shadow-md transition-all max-sm:hidden  ${
        sidebarCollapsed ? "w-16" : "w-64 "
      }`}
    >
      <div className="flex flex-col h-full ">
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold dark:text-white">Task Manager</h1>
          )}
          {/* {sidebarCollapsed && (
            <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
            <ListTodo className="w-16 h-8" />
          )} */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav className={`flex-1 space-y-2 ${ !sidebarCollapsed && "px-2"} `}>
          <Button
            variant={boardView == "list" ? "secondary" : "ghost"}
            className={`w-full gap-2 ${sidebarCollapsed ? "justify-center" :"justify-start"}`}
            onClick={() => setBoardView("list")}
          >
            <List className=" h-4 w-4" />
            {!sidebarCollapsed && "Task List"}
          </Button>
          <Button
            variant={boardView == "kanban" ? "secondary" : "ghost"}
            className={`w-full gap-2 ${sidebarCollapsed ? "justify-center" :"justify-start"}`}
            onClick={() => setBoardView("kanban")}
          >
            <LayoutGrid className="h-4 w-4" />
            {!sidebarCollapsed && "Kanban Board"}
          </Button>
        </nav>
        <div className="p-4">
          {sidebarCollapsed ? (
            <div className="flex flex-col items-center space-y-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/avatar.png" />
                      <AvatarFallback>{ user?.name.charAt(0).toUpperCase() }</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-3">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src="/avatar.png" />
                      <AvatarFallback>{ user?.name.charAt(0).toUpperCase() }</AvatarFallback>
                    </Avatar>
                    <span className="capitalize">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={handleLogout}>

                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>

                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
