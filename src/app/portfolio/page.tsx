import { readData } from "@/lib/store";
import Link from "next/link";

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

  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900">{profile.name}</h1>
          {profile.headline && <p className="mt-1 text-lg text-slate-600">{profile.headline}</p>}
          {profile.location && <p className="mt-1 text-sm text-slate-400">{profile.location}</p>}
          {profile.bio && <p className="mt-4 max-w-2xl text-slate-700">{profile.bio}</p>}

          <div className="mt-4 flex flex-wrap gap-3">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="text-sm font-medium text-slate-900 underline">
                {profile.email}
              </a>
            )}
            {profile.links.map((l) => (
              <a
                key={l.id}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-900 underline"
              >
                {l.label}
              </a>
            ))}
          </div>

          {profile.skills.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <span key={s} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                  {s}
                </span>
              ))}
            </div>
          )}
        </header>

        {profile.projects.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Projects</h2>
            <div className="space-y-6">
              {profile.projects.map((p) => (
                <div key={p.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-medium text-slate-900">{p.title}</h3>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-slate-500 underline shrink-0"
                      >
                        View →
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{p.description}</p>
                  {p.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.experience.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Experience</h2>
            <div className="space-y-6">
              {profile.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-medium text-slate-900">
                      {e.role} · {e.organization}
                    </h3>
                    <span className="text-xs text-slate-400 shrink-0">
                      {e.startDate}
                      {e.endDate ? ` – ${e.endDate}` : " – present"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{e.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.coursework.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Coursework</h2>
            <div className="space-y-6">
              {profile.coursework.map((c) => (
                <div key={c.id}>
                  <h3 className="font-medium text-slate-900">
                    {c.title} · {c.institution}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{c.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
