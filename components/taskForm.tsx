import invariant from "tiny-invariant";
import { createAndUpdateTask } from "@/app/actions/tasks";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tables } from "@/utils/supabase/supabase";
export default function TaskForm({ task }: { task: Tables<"tasks"> }) {
  invariant(task.name !== null, "task name is required");
  invariant(task.description !== null, "Task description is required");
  invariant(task.due_date !== null, "task due date is required");
  invariant(task.id !== null, "task id is required");
  return (
    <form action={createAndUpdateTask}>
      <Label>
        Name
        <Input name="name" defaultValue={task.name} />
      </Label>
      <Label>
        Description
        <Input name="description" defaultValue={task.description} />
      </Label>
      <Label>
        Due Date
        <Input name="due_date" type="date" defaultValue={task.due_date} />
      </Label>
      <input type="hidden" name="id" value={task.id} />
      <input
        type="hidden"
        name="project_id"
        value={task.project_id?.toString() ?? ""}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
