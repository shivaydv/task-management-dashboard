"use client";

import { useStore } from "@/lib/store";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const DeleteModal = () => {
  const {
    setTaskToDelete,
    taskToDelete,
    deleteTask,
    setIsDeleteModalOpen,
    isDeleteModalOpen,
  } = useStore();
  const {toast} = useToast();

  const handleDeleteTask = async() => {
    if (taskToDelete) {
      const res = await fetch("http://localhost:5000/api/deletetask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: taskToDelete }),
      });
      const data = await res.json();

      deleteTask(taskToDelete);
      toast({
        title: "Task Deleted",
        variant: "destructive",
        duration: 2000,
      })
      setTaskToDelete("");
      setIsDeleteModalOpen(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setTaskToDelete("");
    setIsDeleteModalOpen(false);
  };

 
  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteTask}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
