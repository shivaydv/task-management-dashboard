"use client";

import Sidebar from "./Sidebar";
import { useStore } from "@/lib/store";
import Header from "./Header";
import Tasklist from "./Tasklist";
import Kanban from "./Kanban";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function DashboardComponent() {
  const { boardView, user, setUser,setTasks,tasks } = useStore();
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
    const url = "http://localhost:5000/api/alltasks";
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
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 p-8 overflow-auto">
          <Header />
          {boardView === "list" ? <Tasklist /> : <Kanban />}
        </div>
      </div>
    );
}
