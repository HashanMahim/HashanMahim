import { readData } from "@/lib/store";
import { Dashboard } from "@/components/Dashboard";
import { Nav } from "@/components/Nav";

// Profile data lives in a file on disk that the API routes write to at
// request time, so this page must never be statically cached — otherwise
// edits made after the build are invisible until the next deploy.
export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await readData();
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Dashboard initialProfile={data.profile} initialPosts={data.posts} />
      </main>
    </>
  );
}
