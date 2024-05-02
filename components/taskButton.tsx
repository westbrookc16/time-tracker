import { SubmitButton } from '@/components/submit-button';
import { startTask, completeTask } from '@/app/actions/tasks';
import { Tables } from '@/utils/supabase/supabase';
export default async function TaskButton({
  task,
  page,
}: {
  task: Tables<'tasks'>;
  page: string;
}) {
  return (
    <form className='mt-2 mb-2'>
      <input type='hidden' id='page' value={page} name='page' />
      <input type='hidden' name='task_id' value={task.id} />
      <input type='hidden' name='project_id' value={task.project_id ?? ''} />
      {task.status === 'In Progress' ? (
        <SubmitButton
          className='bg-slate-700 px-4 py-2 rounded text-slate-50'
          pendingText='Submitting'
          formAction={completeTask}
        >
          Complete Task
        </SubmitButton>
      ) : (
        <SubmitButton
          className='bg-slate-700 px-4 py-2 rounded text-slate-50'
          pendingText='Submitting'
          formAction={startTask}
        >
          Start Task
        </SubmitButton>
      )}
    </form>
  );
}
