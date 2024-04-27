"use client";
import { Button } from "./ui/button";
import { signOut } from "@/app/actions/user";
import { createClient } from "@/utils/supabase/client";
export default function SignOutButton() {
  return (
    <>
      <Button
        onClick={async () => {
          await signOut();
        }}
      >
        Logout
      </Button>
    </>
  );
}
