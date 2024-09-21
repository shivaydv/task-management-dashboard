import Header from "@/components/Header"
import Kanban from "@/components/Kanban"
import Tasklist from "@/components/Tasklist"

const Test =()=>{
    return (
        <>
        <Header/>
        <div className="flex-1 p-8 overflow-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-white">Task List</h2>
          {/* <Button onClick={() => setIsAddTaskModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button> */}
        </div>
        <Kanban/>
        </div>
        </>
    )
}

export default Test