import { signOut } from "@/app/actions/user";
import SignOutButton from "@/components/signout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Navbar({ user_id }: { user_id: string }) {
  return (
    <div>
      <ul>
        {user_id === "" ? (
          <li>
            <Link href={`/login`}>Login</Link>
          </li>
        ) : (
          <li>
            <SignOutButton />
          </li>
        )}

        {user_id !== "" && (
          <li>
            <Link href={`/projects`}>Projects</Link>
          </li>
        )}
        {user_id !== "" && (
          <li>
            <Link href={`/projects/new`}>Enter New Project</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
