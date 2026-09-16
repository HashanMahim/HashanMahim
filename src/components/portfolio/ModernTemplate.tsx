import type { Profile, SectionKey } from "@/lib/types";
import { visibleSections } from "@/lib/theme";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export function ModernTemplate({ profile }: { profile: Profile }) {
  const sections = visibleSections(profile.theme);

  const renderers: Record<SectionKey, () => React.ReactNode> = {
    projects: () =>
      profile.projects.length > 0 && (
        <section key="projects" className="mb-12">
          <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--pb-text)" }}>
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profile.projects.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border p-5 shadow-sm"
                style={{ backgroundColor: "var(--pb-surface)", borderColor: "var(--pb-border)" }}
              >
                <div
                  className="mb-3 h-1 w-10 rounded-full"
                  style={{ backgroundColor: "var(--pb-accent)" }}
                />
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold" style={{ color: "var(--pb-text)" }}>
                    {p.title}
                  </h3>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs font-medium"
                      style={{ color: "var(--pb-accent)" }}
                    >
                      View →
                    </a>
                  )}
                </div>
                <p className="mt-2 text-sm" style={{ color: "var(--pb-muted)" }}>
                  {p.description}
                </p>
                {p.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: "var(--pb-accent)", color: "var(--pb-accent-contrast)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ),
    experience: () =>
      profile.experience.length > 0 && (
        <section key="experience" className="mb-12">
          <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--pb-text)" }}>
            Experience
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profile.experience.map((e) => (
              <div
                key={e.id}
                className="rounded-xl border p-5 shadow-sm"
                style={{ backgroundColor: "var(--pb-surface)", borderColor: "var(--pb-border)" }}
              >
                <p className="text-xs font-medium" style={{ color: "var(--pb-accent)" }}>
                  {e.startDate}
                  {e.endDate ? ` – ${e.endDate}` : " – present"}
                </p>
                <h3 className="mt-1 font-semibold" style={{ color: "var(--pb-text)" }}>
                  {e.role}
                </h3>
                <p className="text-sm" style={{ color: "var(--pb-muted)" }}>
                  {e.organization}
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--pb-muted)" }}>
                  {e.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      ),
    coursework: () =>
      profile.coursework.length > 0 && (
        <section key="coursework">
          <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--pb-text)" }}>
            Coursework
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profile.coursework.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border p-5 shadow-sm"
                style={{ backgroundColor: "var(--pb-surface)", borderColor: "var(--pb-border)" }}
              >
                <h3 className="font-semibold" style={{ color: "var(--pb-text)" }}>
                  {c.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--pb-muted)" }}>
                  {c.institution}
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--pb-muted)" }}>
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      ),
  };

  return (
    <div>
      <div
        className="px-4 py-16 sm:px-6 sm:py-24"
        style={{
          background: `linear-gradient(135deg, var(--pb-accent), var(--pb-surface))`,
        }}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 sm:flex-row sm:items-center">
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold shadow-md sm:h-20 sm:w-20"
            style={{ backgroundColor: "var(--pb-bg)", color: "var(--pb-accent)" }}
          >
            {initials(profile.name)}
          </span>
          <div>
            <h1
              className="text-2xl font-bold sm:text-4xl"
              style={{ color: "var(--pb-accent-contrast)" }}
            >
              {profile.name}
            </h1>
            {profile.headline && (
              <p className="mt-1 text-sm sm:text-lg" style={{ color: "var(--pb-accent-contrast)" }}>
                {profile.headline}
              </p>
            )}
            {profile.location && (
              <p className="mt-1 text-xs opacity-80 sm:text-sm" style={{ color: "var(--pb-accent-contrast)" }}>
                {profile.location}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
        {profile.bio && (
          <p className="mb-6 max-w-2xl text-sm sm:text-base" style={{ color: "var(--pb-text)" }}>
            {profile.bio}
          </p>
        )}

        <div className="mb-8 flex flex-wrap gap-3">
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border px-3 py-1 text-sm font-medium"
              style={{ borderColor: "var(--pb-border)", color: "var(--pb-text)" }}
            >
              {profile.email}
            </a>
          )}
          {profile.links.map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border px-3 py-1 text-sm font-medium"
              style={{ borderColor: "var(--pb-border)", color: "var(--pb-text)" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {profile.skills.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <span
                key={s}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: "var(--pb-surface)", color: "var(--pb-text)", border: "1px solid var(--pb-border)" }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {sections.map((key) => renderers[key]())}
      </div>
    </div>
  );
}
