"use client"

import React from "react";
import {Task} from "@/types/types"
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";
import { useTaskStore } from "@/store/taskStore";
import { useModalStore } from "@/store/modalStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const EditDeleteMenu = ({task}:{task:Task}) => {

    const { setTaskToDelete, setNewTask } = useTaskStore();
    const {  setIsDeleteModalOpen, setIsAddModalOpen } = useModalStore();
    
return (
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
  );
};

export default EditDeleteMenu;
