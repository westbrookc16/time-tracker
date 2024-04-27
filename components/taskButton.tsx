import { SubmitButton } from "@/components/submit-button";
import { startTask, completeTask } from "@/app/actions/tasks";
import { Tables } from "@/utils/supabase/supabase";
export default async function TaskButton({
  task,
  page,
}: {
  task: Tables<"tasks">;
  page: string;
}) {
  return (
    <form>
      <input type="hidden" id="page" value={page} />
      <input type="hidden" name="task_id" value={task.id} />
      <input type="hidden" name="project_id" value={task.project_id ?? ""} />
      {task.status === "In Progress" ? (
        <SubmitButton pendingText="Submitting" formAction={completeTask}>
          Complete Task
        </SubmitButton>
      ) : (
        <SubmitButton pendingText="Submitting" formAction={startTask}>
          Start Task
        </SubmitButton>
      )}
    </form>
  );
}
