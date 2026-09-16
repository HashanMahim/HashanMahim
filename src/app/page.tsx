import { readData } from "@/lib/store";
import { Dashboard } from "@/components/Dashboard";
import { Nav } from "@/components/Nav";

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
