"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { EmptyTask } from "@/lib/constants";
import { useTaskStore } from "@/store/taskStore";
import { useModalStore } from "@/store/modalStore";
import { TaskPriority, TaskStatus } from "@/types/types";
import { useDashboardStore } from "@/store/dashboardStore";
import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle,} from "./ui/dialog";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "./ui/select";

const AddTaskModal = () => {

  const { newTask, updateTask, setNewTask, addTask } = useTaskStore();
  const { isAddModalOpen, setIsAddModalOpen } = useModalStore();
  const { user } = useDashboardStore();
  const { toast } = useToast();

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setNewTask(EmptyTask);
  };

  const handleAddTask = async () => {

    // if there is id present in task it will update that task
    if (newTask._id) {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/updatetask`;
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTask }),
      };
      const res = await fetch(url, headers);
      const data = await res.json();

      updateTask(newTask);
      toast({
        title: "Task Updated",
        variant: "default",
        className: "bg-green-400 text-black",
        duration: 2000,
      });
      setNewTask(EmptyTask);
      setIsAddModalOpen(false);
    } else {

      // is there is no id present in task it will add new task to the list
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/addtask`;
        const headers = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ ...newTask, user: user?.email }),
        };
        const res = await fetch(url, headers);
        const data = await res.json();
        addTask(data.task);
        toast({
          title: "Task Added",
          variant: "default",
          className: "bg-green-400 text-black",
          duration: 2000,
        });
      } catch (error) {
        console.error(error);
      }

      setNewTask(EmptyTask);
      setIsAddModalOpen(false);
    }
  };


  return (
    <Dialog open={isAddModalOpen} onOpenChange={handleAddModalClose}>
      <DialogContent>
        
        <DialogHeader>
          <DialogTitle>
            {newTask._id ? "Edit Task" : "Add New Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 ">
          <div className="grid grid-cols-4 items-center gap-4 ">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              id="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-left">
              Status
            </Label>
            <Select
              value={newTask.status}
              onValueChange={(value) =>
                setNewTask({ ...newTask, status: value as TaskStatus })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-left">
              Priority
            </Label>
            <Select
              value={newTask.priority}
              onValueChange={(value) =>
                setNewTask({ ...newTask, priority: value as TaskPriority })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-left">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={
                newTask.dueDate ? format(newTask.dueDate, "yyyy-MM-dd") : ""
              }
              onChange={(e) =>
                setNewTask({...newTask,dueDate: e.target.value? new Date(e.target.value): undefined,})
              }
              className="col-span-3 w-fit"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleAddTask}>
            {newTask._id ? "Save Changes" : "Add Task"}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
