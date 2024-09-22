"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { priorityColor } from "@/lib/constants";
import {Task} from "@/types/types"
import { Badge } from "./ui/badge";
import { Calendar, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import EditDeleteMenu from "./EditDeleteMenu";
import { useTaskStore } from "@/store/taskStore";
import { useModalStore } from "@/store/modalStore";

const Kanban = () => {


  const {toast} = useToast();


  const {
    setTaskToDelete,
    tasks,
    setNewTask,
    setTasks
  } = useTaskStore();

  const {
    setIsDeleteModalOpen,
    setIsAddModalOpen,
  } = useModalStore();

  const updateTaskStatus = async (task:Task) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/updatetask`;
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...task, status: task.status }),
      };
      const res = await fetch(url, headers);
      const data = await res.json();
      toast({
        title: "Task Updated",
        variant: "default",
        className: "bg-green-400 text-black",
        duration: 2000,
      })
    } catch (error) {
      toast({
        title: "Error updating task status",
        variant: "default",
        className: "bg-red-400 text-black",
        duration: 2000,
      })
      console.error("Error updating task status:", error);
    }
  };

  const onDragEnd = (result:any) => {
    if (!result.destination) return;

    const draggedItemId = result.draggableId;
    const sourceColumn = result.source.droppableId;
    const destinationColumn = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // If the task is moved within the same column
    if (sourceColumn === destinationColumn) {
      const newTasks = Array.from(tasks);
      const [movedTask] = newTasks.splice(sourceIndex, 1);
      newTasks.splice(destinationIndex, 0, movedTask);
      setTasks(newTasks);

      console.log(`Item dragged: ${draggedItemId}`);
      console.log(`Dragged within the same column: ${sourceColumn}`);
      console.log(
        `Moved from index: ${sourceIndex} to index: ${destinationIndex}`
      );
      console.log("Updated tasks:", newTasks);
    } else {
      // Find the task that was dragged
      const taskIndex = tasks.findIndex((task) => task._id === draggedItemId);
      const updatedTask = { ...tasks[taskIndex], status: destinationColumn };

      // Create a new tasks array with the updated task
      const newTasks = [
        ...tasks.slice(0, taskIndex),
        updatedTask,
        ...tasks.slice(taskIndex + 1),
      ];

      setTasks(newTasks);
      updateTaskStatus(updatedTask);

      console.log(`Item dragged: ${draggedItemId}`);
      console.log(`Dragged from: ${sourceColumn}`);
      console.log(`Dragged to: ${destinationColumn}`);
      console.log(`Current state of item:`, updatedTask);
      console.log("Updated tasks:", newTasks);
    }
  };



  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 justify-evenly max-lg:flex-wrap ">
        {["To Do", "In Progress", "Completed"].map((status) => (
          <div key={status} className="dark:bg-secondary bg-gray-200 p-4 rounded-lg w-full">
            <h3 className="font-semibold mb-4">{status}</h3>
            <Droppable droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2 min-h-[100px]" // Ensure minimum height to allow dropping in empty columns
                >
                  {tasks
                    .filter((task) => task.status === status)
                    .sort((a, b) => a.title.localeCompare(b.title)) // Sort tasks by title
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-background p-4 rounded shadow flex justify-between"
                          >
                            <div className="flex flex-col items-start">
                            <Badge  className={priorityColor(task.priority)}>
                                  {task.priority}
                                </Badge>
                              <div className="capitalize">
                                <h3 className="font-semibold text-lg ">{task.title}</h3>
                                {task.description && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 my-1">
                                    {task.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-1">
                              {task.dueDate && (
                                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {format(task.dueDate, "MMM d, yyyy")}
                                  </div>
                                )}

                              </div>

                            </div>
                            <EditDeleteMenu task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Kanban;
