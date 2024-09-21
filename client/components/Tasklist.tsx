"use client";

import React, { useEffect, useState } from "react";
import { MoreVertical, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { priorityColor, TaskPriority, TaskStatus, useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const Tasklist = () => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">(
    "all"
  );
  const [sortBy, setSortBy] = useState<
    "title" | "priority" | "dueDate" | "none"
  >("none");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    setTaskToDelete,
    tasks,
    updateTask,
    setIsDeleteModalOpen,
    setIsAddModalOpen,
    setNewTask,
  } = useStore();
  const { toast } = useToast();

  const filteredTasks = tasks.filter(
    (task) =>
      (statusFilter === "all" || task.status === statusFilter) &&
      (priorityFilter === "all" || task.priority === priorityFilter)
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "title")
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);

    if (sortBy === "priority") {
      const priorityOrder = { Low: 0, Medium: 1, High: 2 };
      return sortOrder === "asc"
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    if (sortBy === "dueDate") {
      if (!a.dueDate) return sortOrder === "asc" ? 1 : -1;
      if (!b.dueDate) return sortOrder === "asc" ? -1 : 1;

      return sortOrder === "asc"
        ? a.dueDate.getTime() - b.dueDate.getTime()
        : b.dueDate.getTime() - a.dueDate.getTime();
    }

    return 0;
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Filters  */}
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as TaskStatus | "all")
          }
        >
          <SelectTrigger className="w-[180px] bg-primary text-primary-foreground">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={priorityFilter}
          onValueChange={(value) =>
            setPriorityFilter(value as TaskPriority | "all")
          }
        >
          <SelectTrigger className="w-[180px] bg-primary text-primary-foreground">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortBy}
          onValueChange={(value) =>
            setSortBy(value as "title" | "priority" | "dueDate" | "none")
          }
        >
          <SelectTrigger className="w-[180px] bg-primary text-primary-foreground">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Sorting</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
          </SelectContent>
        </Select>
        {sortBy !== "none" && (
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        )}
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        {sortedTasks.length == 0 ?
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No tasks found</div>
        :sortedTasks.map((task) => (
          <div
            key={task._id}
            className=" dark:border  p-4 rounded shadow flex justify-between items-center"
          >
            <div className="flex flex-col items-start">
              <div>
                <h3 className="font-semibold ">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {task.description}
                  </p>
                )}
              </div>
              {/* Tasks Stats  */}
              <div className="flex items-center gap-2 mt-2 ">
                {/* <Badge variant="default" className="">{task.status}</Badge> */}
                <Badge className={priorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                {task.dueDate && (
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(task.dueDate, "MMM d, yyyy")}
                  </div>
                )}
              </div>
            </div>

            {/* Task Actions  */}
            <div className="flex gap-2">
              <Select
                value={task.status}
                onValueChange={async (value) => {
                  const url = "http://localhost:5000/api/updatetask";
                  const headers = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...task, status: value }),
                  };
                  const res = await fetch(url, headers);
                  const data = await res.json();

                  updateTask({ ...task, status: value as TaskStatus });
                  toast({
                    title: "Task Updated",
                    variant: "default",
                    className: "bg-green-400 text-black",
                    duration: 2000,
                  })
                }}
              >
                <SelectTrigger className={` w-[140px] max-md:hidden `}>
                  <SelectValue placeholder={"Status"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* Edit and Delete Tasks  */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setNewTask(task);
                      setIsAddModalOpen(true);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setTaskToDelete(task._id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasklist;
