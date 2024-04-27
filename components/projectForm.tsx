import invariant from "tiny-invariant";
import { createAndUpdateProject } from "@/app/actions/projects";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tables } from "@/utils/supabase/supabase";
export default function ProjectForm({
  project,
}: {
  project: Tables<"projects">;
}) {
  invariant(project.name !== null, "Project name is required");
  invariant(project.description !== null, "Project description is required");
  invariant(project.due_date !== null, "Project due date is required");
  invariant(project.id !== null, "Project id is required");
  return (
    <form action={createAndUpdateProject}>
      <Label>
        Name
        <Input name="name" defaultValue={project.name} />
      </Label>
      <Label>
        Description
        <Input name="description" defaultValue={project.description} />
      </Label>
      <Label>
        Due Date
        <Input name="due_date" type="date" defaultValue={project.due_date} />
      </Label>
      <input type="hidden" name="id" value={project.id} />
      <Button type="submit">Save</Button>
    </form>
  );
}
