import { DateTime } from 'luxon';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { getAllProjects } from '../actions/projects';
export default async function index() {
  const projects = await getAllProjects();
  return (
    <div className=''>
      <div className='container'>
        <h1 className='font-semibold mt-5 mb-5'>Select a Project</h1>
        <ul className='flex justify-center flex-col gap-3 border rounded bg-slate-100 w-[600px] p-2 '>
          {projects.map((project) => (
            <li key={project.id} className=' border-b-2'>
              <div className='flex justify-start items-center gap-2 '>
                <span>Name:</span>
                <Link
                  href={`/projects/${project.id}`}
                  className=' text-slate-800 font-medium hover:text-slate-500 hover:underline '
                >
                  {project.name} 🡢
                </Link>
              </div>
              <div className='flex justify-start items-center gap-2'>
                <span>Description:</span>
                <p className='mt-3 mb-3 font-light flex-wrap'>
                  {project.description}
                </p>
              </div>
              <div className='font-light flex justify-start items-center gap-2'>
                <span>Due Date:</span>
                <span className='text-red-700'>
                  {DateTime.fromISO(project.due_date ?? '').toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
