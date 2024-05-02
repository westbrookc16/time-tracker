import TaskButton from '@/components/taskButton';
import { getTaskByID } from '@/app/actions/tasks';
import { columns } from './columns';
import TaskForm from '@/components/taskForm';
import { TaskWithItems } from '@/types/taskWithItems';
import { DataTable } from '@/components/dataTable';
import { ColumnDef } from '@tanstack/react-table';
import { createClient } from '@/utils/supabase/server';
import { Tables } from '@/utils/supabase/supabase';
import { DateTime } from 'luxon';
import { redirect } from 'next/navigation';
import invariant from 'tiny-invariant';
export default async function Task({ params }: { params: { id: string } }) {
  //@ts-ignore
  const task: TaskWithItems = await getTaskByID(params.id);

  return (
    <div className=''>
      <div className='container w-[350px] md:w-[600px]'>
        <h1 className='font-semibold mt-5 mb-5'>View/Edit Task</h1>
        <TaskForm task={task} />
        {task.task_items.length > 0 && (
          <div>
            <h2>Task Items</h2>
            <DataTable columns={columns} data={task.task_items} />
          </div>
        )}
        <TaskButton task={task} page='tasks' />
      </div>
    </div>
  );
}
