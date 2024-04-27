"use server";
import { createClient } from "@/utils/supabase/server";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import invariant from "tiny-invariant";
export async function createAndUpdateTask(data: FormData) {
  const { data: userData } = await createClient().auth.getUser();

  const id = data.get("id") as string;
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const due_date = data.get("due_date") as string;
  const project_id = data.get("project_id") as string;
  const user_id = userData.user?.id ?? "";
  if (id === "0") {
    const { data, error } = await createClient()
      .from("tasks")
      .insert({
        name,
        description,
        due_date,
        project_id: +project_id,
        status: "Not Started",
        user_id,
      })
      .select("id");
    if (error) {
      throw error;
    }
    return redirect(`/projects/${project_id}`);
  } else {
    const { error } = await createClient()
      .from("tasks")
      .update({ name, description, due_date })
      .eq("id", id);
    if (error) {
      throw error;
    }
    return redirect(`/projects/${project_id}`);
  }
}
export async function getTasksByProjectID(project_id: string) {
  const { data, error } = await createClient()
    .from("tasks")
    .select("*")
    .eq("project_id", project_id);
  if (error) {
    throw error;
  }
  return data;
}
export async function startTask(data: FormData) {
  const task_id = data.get("task_id") as string;
  const project_id = data.get("project_id") as string;
  const { data: task_item, error: task_item_error } = await createClient()
    .from("task_items")
    .insert({
      task_id: +task_id,
      status: "In Progress",
      start_date: DateTime.now().toUTC().toISO(),
    })
    .select("*")
    .single();
  if (task_item_error) {
    throw task_item_error;
  }
  const { error } = await createClient()
    .from("tasks")
    .update({ status: "In Progress", current_item: task_item?.id })
    .eq("id", task_id);
  if (error) {
    throw error;
  }
  if ((data.get("page") as string) === "projects")
    return redirect(`/projects/${project_id}`);
  else return redirect(`/projects/tasks/${task_id}`);
}
export async function completeTask(data: FormData) {
  const task_id = data.get("task_id") as string;
  const project_id = data.get("project_id") as string;
  const { data: task, error: task_error } = await createClient()
    .from("tasks")
    .select("*")
    .eq("id", task_id)
    .single();
  if (task_error) {
    throw task_error;
  }
  invariant(task.current_item, "Task current item not found");
  const { data: task_item, error: task_item_error } = await createClient()
    .from("task_items")
    .update({
      status: "Complete",
      end_date: DateTime.now().toUTC().toISO(),
    })
    .eq("id", +task.current_item);
  if (task_item_error) {
    throw task_item_error;
  }
  const { error } = await createClient()
    .from("tasks")
    .update({ status: "Complete", current_item: null })
    .eq("id", task_id);
  if (error) {
    throw error;
  }
  if ((data.get("page") as string) === "projects")
    return redirect(`/projects/${project_id}`);
  else return redirect(`/projects/tasks/${task_id}`);
}

export async function getTaskByID(id: string) {
  const { data, error } = await createClient()
    .from("tasks")
    .select(`*, task_items:id(*)`)
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
}
