import TaskButton from '@/components/taskButton';
import { getProjectByID } from '@/app/actions/projects';

import Link from 'next/link';
import { DateTime } from 'luxon';
import {
  startTask,
  completeTask,
  getTasksByProjectID,
} from '@/app/actions/tasks';
import ProjectForm from '@/components/projectForm';
import TaskForm from '@/components/taskForm';
import { SubmitButton } from '@/components/submit-button';

export default async function Project({ params }: { params: { id: string } }) {
  const project = await getProjectByID(params.id);
  const tasks = await getTasksByProjectID(params.id);
  return (
    <div className=''>
      <div className='container w-[350px] md:w-[600px]'>
        <h1 className='font-semibold mt-5 mb-5'>Edit Project</h1>
        <ProjectForm project={project} />
        <h2 className='font-semibold mt-5 mb-5 text-center'>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <>
              <li key={task.id} className=' border-b-2'>
                <div className='flex justify-start items-center gap-2 mt-4'>
                  <span>Name:</span>
                  <Link
                    href={`/projects/tasks/${task.id}`}
                    className=' text-slate-800 font-medium hover:text-slate-500 hover:underline '
                  >
                    {task.name} 🡢
                  </Link>
                </div>
                <div className='flex justify-start items-center gap-2'>
                  <span>Description:</span>
                  <p className='mt-3 mb-3 font-light flex-wrap'>
                    {task.description}
                  </p>
                </div>
                <div className=' flex justify-start items-center gap-2'>
                  <span>Due Date:</span>
                  <span className='text-red-700 text-sm font-light'>
                    {DateTime.fromISO(project.due_date ?? '').toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-start items-center gap-2 text-sm text-blue-500 mt-2 mb-2'>
                  {task.status}
                </div>
                <TaskButton task={task} page='projects' />
              </li>
            </>
          ))}
        </ul>
        <h2 className='font-semibold mt-5 mb-5 text-center'>Add Task</h2>
        <TaskForm
          task={{
            name: '',
            current_item: null,
            description: '',
            due_date: '',
            project_id: project.id,
            id: 0,
            status: '',
            user_id: '',
          }}
        />
      </div>
    </div>
  );
}
