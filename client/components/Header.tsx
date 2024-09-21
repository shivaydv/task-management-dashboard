"use client"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { useStore } from "@/lib/store"


const Header = () => {

  const {boardView,setIsAddModalOpen} = useStore()

  return (
    <>
    <div className="mb-4 flex items-center justify-between  ">
          <h2 className="text-2xl font-bold dark:text-white">{boardView === 'list' ? 'List View' : 'Kanban Board View'}</h2>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
    </div>

    </>
  )
}

export default Header