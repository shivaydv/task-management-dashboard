"use client";

import Sidebar from "./Sidebar";

import Header from "./Header";
import Tasklist from "./Tasklist";
import Kanban from "./Kanban";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useDashboardStore } from "@/store/dashboardStore";

export function DashboardComponent() {
  const { boardView, user, setUser } = useDashboardStore();
  const { tasks,setTasks } = useTaskStore();
  const router = useRouter();

  useEffect(() => {
    setUser(
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null
    );
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const fetchTasks = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/alltasks`;
    const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": user?.token || "",
        },
        body: JSON.stringify({user:user?.email}),
      }

    const res = await fetch(url, headers);
    const result = await res.json();
    setTasks(result.tasks);

  }

  useEffect(()=>{
    try {
      fetchTasks()
    } catch (error) {
      console.error(error);

    }

  },[])

  if (!user) {
    return null;
  } else
    return (
      <div className="flex max-sm:flex-col h-screen bg-secondary dark:bg-background">
        <Sidebar />
        <div className="flex-1 p-8 overflow-auto ">
          <Header />
          {boardView === "list" ? <Tasklist/> : <Kanban />}
        </div>
      </div>
    );
}
