import type { Profile, SectionKey } from "@/lib/types";
import { visibleSections } from "@/lib/theme";

function TimelineItem({
  title,
  subtitle,
  meta,
  description,
  isLast,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <div className="relative flex gap-4 pb-8">
      {!isLast && (
        <span
          className="absolute top-3 left-[5px] w-px"
          style={{ bottom: "-0.5rem", backgroundColor: "var(--pb-border)" }}
        />
      )}
      <span
        className="relative mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: "var(--pb-accent)" }}
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-medium" style={{ color: "var(--pb-text)" }}>
            {title}
          </h3>
          {meta && (
            <span className="shrink-0 text-xs" style={{ color: "var(--pb-muted)" }}>
              {meta}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm" style={{ color: "var(--pb-accent)" }}>
            {subtitle}
          </p>
        )}
        <p className="mt-1 text-sm" style={{ color: "var(--pb-muted)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export function TimelineTemplate({ profile }: { profile: Profile }) {
  const sections = visibleSections(profile.theme);

  const renderers: Record<SectionKey, () => React.ReactNode> = {
    projects: () =>
      profile.projects.length > 0 && (
        <section key="projects" className="mb-12">
          <h2 className="mb-4 text-xl font-semibold" style={{ color: "var(--pb-text)" }}>
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profile.projects.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border p-4"
                style={{ borderColor: "var(--pb-border)" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium" style={{ color: "var(--pb-text)" }}>
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
                <p className="mt-1 text-sm" style={{ color: "var(--pb-muted)" }}>
                  {p.description}
                </p>
                {p.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-2 py-0.5 text-xs"
                        style={{ backgroundColor: "var(--pb-surface)", color: "var(--pb-muted)" }}
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
          <h2 className="mb-4 text-xl font-semibold" style={{ color: "var(--pb-text)" }}>
            Experience
          </h2>
          <div>
            {profile.experience.map((e, idx) => (
              <TimelineItem
                key={e.id}
                title={e.role}
                subtitle={e.organization}
                meta={`${e.startDate}${e.endDate ? ` – ${e.endDate}` : " – present"}`}
                description={e.description}
                isLast={idx === profile.experience.length - 1}
              />
            ))}
          </div>
        </section>
      ),
    coursework: () =>
      profile.coursework.length > 0 && (
        <section key="coursework">
          <h2 className="mb-4 text-xl font-semibold" style={{ color: "var(--pb-text)" }}>
            Coursework
          </h2>
          <div>
            {profile.coursework.map((c, idx) => (
              <TimelineItem
                key={c.id}
                title={c.title}
                subtitle={c.institution}
                description={c.description}
                isLast={idx === profile.coursework.length - 1}
              />
            ))}
          </div>
        </section>
      ),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-12">
        <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--pb-text)" }}>
          {profile.name}
        </h1>
        {profile.headline && (
          <p className="mt-1 text-base sm:text-lg" style={{ color: "var(--pb-muted)" }}>
            {profile.headline}
          </p>
        )}
        {profile.location && (
          <p className="mt-1 text-sm" style={{ color: "var(--pb-muted)" }}>
            {profile.location}
          </p>
        )}
        {profile.bio && (
          <p className="mt-4 max-w-2xl text-sm sm:text-base" style={{ color: "var(--pb-text)" }}>
            {profile.bio}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-sm font-medium underline"
              style={{ color: "var(--pb-accent)" }}
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
              className="text-sm font-medium underline"
              style={{ color: "var(--pb-accent)" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {profile.skills.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <span
                key={s}
                className="rounded-full px-3 py-1 text-xs"
                style={{ backgroundColor: "var(--pb-surface)", color: "var(--pb-text)" }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </header>

      {sections.map((key) => renderers[key]())}
    </div>
  );
}
