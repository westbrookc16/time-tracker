import TaskButton from "@/components/taskButton";
import { getProjectByID } from "@/app/actions/projects";

import Link from "next/link";
import { DateTime } from "luxon";
import {
  startTask,
  completeTask,
  getTasksByProjectID,
} from "@/app/actions/tasks";
import ProjectForm from "@/components/projectForm";
import TaskForm from "@/components/taskForm";
import { SubmitButton } from "@/components/submit-button";

export default async function Project({ params }: { params: { id: string } }) {
  const project = await getProjectByID(params.id);
  const tasks = await getTasksByProjectID(params.id);
  return (
    <div>
      <h1>Edit Project</h1>
      <ProjectForm project={project} />
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link href={`projects/tasks/${task.id}`}>{task.name}</Link>
            <br />
            {task.description}
            <br />
            Due Date: {DateTime.fromISO(task.due_date ?? "").toLocaleString()}
            <br />
            {task.status}
            <br />
            <TaskButton task={task} page="projects" />
          </li>
        ))}
      </ul>
      <h2>Add Task</h2>
      <TaskForm
        task={{
          name: "",
          current_item: null,
          description: "",
          due_date: "",
          project_id: project.id,
          id: 0,
          status: "",
          user_id: "",
        }}
      />
    </div>
  );
}
