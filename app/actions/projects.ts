"use server";
import invariant from "tiny-invariant";
import { DateTime } from "luxon";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function getProjects() {
  const { data, error } = await createClient().from("projects").select("*");
  if (error) {
    throw error;
  }
  return data;
}
export async function createAndUpdateProject(data: FormData) {
  const id = data.get("id") as string;
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const due_date = DateTime.fromISO(data.get("due_date") as string)
    .toUTC()
    .toISO();
  if (id === "0") {
    const { data: userData, error: userError } =
      await createClient().auth.getUser();
    if (userError) {
      throw userError;
    }
    const { data, error } = await createClient()
      .from("projects")
      .insert([{ name, description, due_date, user_id: userData?.user.id }])
      .select("id");
    if (error) {
      throw error;
    }
    invariant(data, "Project data is required");
    return redirect(`/projects/${data[0].id}`);
  } else {
    const { error } = await createClient()
      .from("projects")
      .update({ name, description, due_date })
      .eq("id", id);
    if (error) {
      throw error;
    }
    return redirect(`/projects/${id}`);
  }
}
export async function getAllProjects() {
  const { data, error } = await createClient().from("projects").select("*");
  if (error) {
    throw error;
  }
  return data;
}
export async function getProjectByID(id: string) {
  const { data, error } = await createClient()
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
}
