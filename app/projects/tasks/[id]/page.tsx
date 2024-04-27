import TaskButton from "@/components/taskButton";
import { getTaskByID } from "@/app/actions/tasks";
import { columns } from "./columns";
import TaskForm from "@/components/taskForm";
import { TaskWithItems } from "@/types/taskWithItems";
import { DataTable } from "@/components/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/utils/supabase/supabase";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import invariant from "tiny-invariant";
export default async function Task({ params }: { params: { id: string } }) {
  //@ts-ignore
  const task: TaskWithItems = await getTaskByID(params.id);

  return (
    <div>
      <h1>View/Edit Task</h1>
      <TaskForm task={task} />
      {task.task_items.length > 0 && (
        <div>
          <h2>Task Items</h2>
          <DataTable columns={columns} data={task.task_items} />
        </div>
      )}
      <TaskButton task={task} page="tasks" />
    </div>
  );
}
