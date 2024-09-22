"use client"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { useModalStore } from "@/store/modalStore"
import { useDashboardStore } from "@/store/dashboardStore"

const Header = () => {

  const {setIsAddModalOpen} = useModalStore()
  const {boardView} = useDashboardStore()

  return (

    <div className="mb-4 flex items-center justify-between  ">
          <h2 className="text-xl text-nowrap md:text-2xl  font-bold dark:text-white">{boardView === 'list' ? 'List View' : 'Kanban Board View'}</h2>
          <Button size={`sm`} onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
    </div>

  )
}

export default Header