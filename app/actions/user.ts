"use server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function signOut() {
  await createClient().auth.signOut();
  return redirect("/");
}
export async function resetPassword(data: FormData) {
  const origin = headers().get("origin");
  const email = data.get("email") as string;
  const { error } = await createClient().auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm`,
  });
  if (error) {
    return redirect(`/login?message=${error.message}`);
  } else return redirect(`/login?message=Password reset email sent`);
  //}
}
export async function updatePassword(originalState: any, data: FormData) {
  const supabase = createClient();
  const origin = headers().get("origin");
  const password = data.get("password") as string;
  const confirmPassword = data.get("confirmPassword") as string;
  if (password !== confirmPassword) {
    return { message: "Passwords do not match" };
  }
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    console.log(JSON.stringify(error));
    return { message: error.message };
  }
  return redirect("/");
}
