import AddTaskModal from "@/components/AddTaskModal";
import { DashboardComponent } from "@/components/Dashboard";
import DeleteModal from "@/components/DeleteModal";
export default function Home() {



  return (
    <>
      <DashboardComponent />
      <AddTaskModal />
      <DeleteModal />
    </>
  );
}
