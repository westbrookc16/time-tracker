import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/navbar";
import { createClient } from "@/utils/supabase/server";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Time Tracker",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = await createClient().auth.getUser();
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <nav>
          <Navbar user_id={data.user?.id ?? ""} />
        </nav>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
