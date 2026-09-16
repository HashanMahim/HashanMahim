import { readData } from "@/lib/store";
import { fontClassName } from "@/lib/theme";
import { contrastColor } from "@/lib/color";
import { ClassicTemplate } from "@/components/portfolio/ClassicTemplate";
import { ModernTemplate } from "@/components/portfolio/ModernTemplate";
import { TimelineTemplate } from "@/components/portfolio/TimelineTemplate";
import Link from "next/link";

// Same reasoning as src/app/page.tsx: this reads the on-disk profile at
// request time and must not be frozen into a static build-time snapshot.
export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const { profile } = await readData();
  const hasContent =
    profile.name || profile.projects.length || profile.experience.length || profile.coursework.length;

  if (!hasContent) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-24 text-center">
        <div>
          <p className="text-slate-500">No profile yet.</p>
          <Link href="/" className="text-sm font-medium text-slate-900 underline">
            Go fill in your profile →
          </Link>
        </div>
      </main>
    );
  }

  const { theme } = profile;

  return (
    <main
      className={`flex-1 ${fontClassName(theme.fontPairing)}`}
      data-color-mode={theme.colorMode}
      style={
        {
          backgroundColor: "var(--pb-bg)",
          "--pb-accent": theme.accentColor,
          "--pb-accent-contrast": contrastColor(theme.accentColor),
        } as React.CSSProperties
      }
    >
      {theme.template === "modern" && <ModernTemplate profile={profile} />}
      {theme.template === "timeline" && <TimelineTemplate profile={profile} />}
      {theme.template === "classic" && <ClassicTemplate profile={profile} />}
    </main>
  );
}
