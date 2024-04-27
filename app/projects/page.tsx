import { DateTime } from "luxon";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { getAllProjects } from "../actions/projects";
export default async function index() {
  const projects = await getAllProjects();
  return (
    <div>
      <h1>Select a Project</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
            <br />
            {project.description}
            <br />
            Due Date:{" "}
            {DateTime.fromISO(project.due_date ?? "").toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
