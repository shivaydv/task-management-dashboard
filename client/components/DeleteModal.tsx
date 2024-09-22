"use client";


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
import { useModalStore } from "@/store/modalStore";
import { useTaskStore } from "@/store/taskStore";

const DeleteModal = () => {
  const {
    setTaskToDelete,
    taskToDelete,
    deleteTask
  } = useTaskStore();

  const {
    setIsDeleteModalOpen,
    isDeleteModalOpen,
  } = useModalStore();


  const {toast} = useToast();

  const handleDeleteTask = async() => {
    if (taskToDelete) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deletetask`, {
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
