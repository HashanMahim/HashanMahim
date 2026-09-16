"use client";

import { useState } from "react";
import type {
  Profile,
  ProjectEntry,
  ExperienceEntry,
  CourseworkEntry,
  LinkEntry,
  GeneratedPost,
  PostSourceType,
} from "@/lib/types";

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none";
const labelClass = "block text-xs font-medium text-slate-500 mb-1";
const cardClass = "rounded-lg border border-slate-200 bg-white p-4 space-y-3";
const sectionTitleClass = "text-lg font-semibold text-slate-900";
const buttonClass =
  "rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50";
const secondaryButtonClass =
  "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100";
const dangerButtonClass = "text-xs font-medium text-red-500 hover:text-red-700";

function uid() {
  return crypto.randomUUID();
}

export function Dashboard({
  initialProfile,
  initialPosts,
}: {
  initialProfile: Profile;
  initialPosts: GeneratedPost[];
}) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [posts, setPosts] = useState<GeneratedPost[]>(initialPosts);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");

  async function saveProfile() {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setSavedAt(new Date().toLocaleTimeString());
      }
    } finally {
      setSaving(false);
    }
  }

  function field<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  // Links
  function addLink() {
    field("links", [...profile.links, { id: uid(), label: "", url: "" } satisfies LinkEntry]);
  }
  function updateLink(id: string, patch: Partial<LinkEntry>) {
    field(
      "links",
      profile.links.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    );
  }
  function removeLink(id: string) {
    field("links", profile.links.filter((l) => l.id !== id));
  }

  // Skills
  function addSkill() {
    const s = skillInput.trim();
    if (!s || profile.skills.includes(s)) return;
    field("skills", [...profile.skills, s]);
    setSkillInput("");
  }
  function removeSkill(s: string) {
    field("skills", profile.skills.filter((sk) => sk !== s));
  }

  // Projects
  function addProject() {
    field("projects", [
      ...profile.projects,
      { id: uid(), title: "", description: "", link: "", tags: [] } satisfies ProjectEntry,
    ]);
  }
  function updateProject(id: string, patch: Partial<ProjectEntry>) {
    field(
      "projects",
      profile.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );
  }
  function removeProject(id: string) {
    field("projects", profile.projects.filter((p) => p.id !== id));
  }

  // Experience
  function addExperience() {
    field("experience", [
      ...profile.experience,
      { id: uid(), role: "", organization: "", startDate: "", endDate: "", description: "" } satisfies ExperienceEntry,
    ]);
  }
  function updateExperience(id: string, patch: Partial<ExperienceEntry>) {
    field(
      "experience",
      profile.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
  }
  function removeExperience(id: string) {
    field("experience", profile.experience.filter((e) => e.id !== id));
  }

  // Coursework
  function addCoursework() {
    field("coursework", [
      ...profile.coursework,
      { id: uid(), title: "", institution: "", description: "" } satisfies CourseworkEntry,
    ]);
  }
  function updateCoursework(id: string, patch: Partial<CourseworkEntry>) {
    field(
      "coursework",
      profile.coursework.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  }
  function removeCoursework(id: string) {
    field("coursework", profile.coursework.filter((c) => c.id !== id));
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Profile</h1>
          <p className="text-sm text-slate-500">
            Fill this in once — it powers your public portfolio and post drafts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedAt && <span className="text-xs text-slate-400">Saved {savedAt}</span>}
          <button className={buttonClass} onClick={saveProfile} disabled={saving}>
            {saving ? "Saving…" : "Save profile"}
          </button>
        </div>
      </div>

      <section className={cardClass}>
        <h2 className={sectionTitleClass}>Basics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full name</label>
            <input className={inputClass} value={profile.name} onChange={(e) => field("name", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Headline</label>
            <input
              className={inputClass}
              value={profile.headline}
              onChange={(e) => field("headline", e.target.value)}
              placeholder="CS Student @ State University"
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} value={profile.email} onChange={(e) => field("email", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input className={inputClass} value={profile.location} onChange={(e) => field("location", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Bio</label>
          <textarea
            className={inputClass}
            rows={3}
            value={profile.bio}
            onChange={(e) => field("bio", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Links</label>
          <div className="space-y-2">
            {profile.links.map((l) => (
              <div key={l.id} className="flex gap-2">
                <input
                  className={inputClass}
                  placeholder="Label (e.g. GitHub)"
                  value={l.label}
                  onChange={(e) => updateLink(l.id, { label: e.target.value })}
                />
                <input
                  className={inputClass}
                  placeholder="https://…"
                  value={l.url}
                  onChange={(e) => updateLink(l.id, { url: e.target.value })}
                />
                <button className={dangerButtonClass} onClick={() => removeLink(l.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button className={`${secondaryButtonClass} mt-2`} onClick={addLink}>
            + Add link
          </button>
        </div>

        <div>
          <label className={labelClass}>Skills</label>
          <div className="mb-2 flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
              >
                {s}
                <button onClick={() => removeSkill(s)} className="text-slate-400 hover:text-red-500">
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className={inputClass}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              placeholder="Add a skill and press Enter"
            />
            <button className={secondaryButtonClass} onClick={addSkill}>
              Add
            </button>
          </div>
        </div>
      </section>

      <section className={cardClass}>
        <h2 className={sectionTitleClass}>Projects</h2>
        {profile.projects.map((p) => (
          <div key={p.id} className="space-y-2 rounded-md border border-slate-100 p-3">
            <div className="flex gap-2">
              <input
                className={inputClass}
                placeholder="Project title"
                value={p.title}
                onChange={(e) => updateProject(p.id, { title: e.target.value })}
              />
              <button className={dangerButtonClass} onClick={() => removeProject(p.id)}>
                Remove
              </button>
            </div>
            <textarea
              className={inputClass}
              rows={2}
              placeholder="What did you build, and what was the impact?"
              value={p.description}
              onChange={(e) => updateProject(p.id, { description: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Link (optional)"
              value={p.link}
              onChange={(e) => updateProject(p.id, { link: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Tags, comma-separated"
              value={p.tags.join(", ")}
              onChange={(e) =>
                updateProject(p.id, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
              }
            />
          </div>
        ))}
        <button className={secondaryButtonClass} onClick={addProject}>
          + Add project
        </button>
      </section>

      <section className={cardClass}>
        <h2 className={sectionTitleClass}>Experience</h2>
        {profile.experience.map((exp) => (
          <div key={exp.id} className="space-y-2 rounded-md border border-slate-100 p-3">
            <div className="flex gap-2">
              <input
                className={inputClass}
                placeholder="Role"
                value={exp.role}
                onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Organization"
                value={exp.organization}
                onChange={(e) => updateExperience(exp.id, { organization: e.target.value })}
              />
              <button className={dangerButtonClass} onClick={() => removeExperience(exp.id)}>
                Remove
              </button>
            </div>
            <div className="flex gap-2">
              <input
                className={inputClass}
                placeholder="Start (e.g. 2025-06)"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="End (blank = present)"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
              />
            </div>
            <textarea
              className={inputClass}
              rows={2}
              placeholder="What did you do, and what was the outcome?"
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
            />
          </div>
        ))}
        <button className={secondaryButtonClass} onClick={addExperience}>
          + Add experience
        </button>
      </section>

      <section className={cardClass}>
        <h2 className={sectionTitleClass}>Coursework</h2>
        {profile.coursework.map((c) => (
          <div key={c.id} className="space-y-2 rounded-md border border-slate-100 p-3">
            <div className="flex gap-2">
              <input
                className={inputClass}
                placeholder="Course title"
                value={c.title}
                onChange={(e) => updateCoursework(c.id, { title: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Institution"
                value={c.institution}
                onChange={(e) => updateCoursework(c.id, { institution: e.target.value })}
              />
              <button className={dangerButtonClass} onClick={() => removeCoursework(c.id)}>
                Remove
              </button>
            </div>
            <textarea
              className={inputClass}
              rows={2}
              placeholder="What did the course involve, and what did you accomplish?"
              value={c.description}
              onChange={(e) => updateCoursework(c.id, { description: e.target.value })}
            />
          </div>
        ))}
        <button className={secondaryButtonClass} onClick={addCoursework}>
          + Add coursework
        </button>
      </section>

      <PostGenerator profile={profile} posts={posts} setPosts={setPosts} />
    </div>
  );
}

function PostGenerator({
  profile,
  posts,
  setPosts,
}: {
  profile: Profile;
  posts: GeneratedPost[];
  setPosts: (posts: GeneratedPost[]) => void;
}) {
  const [sourceType, setSourceType] = useState<PostSourceType>("project");
  const [sourceId, setSourceId] = useState<string>("");
  const [customTitle, setCustomTitle] = useState("");
  const [customDetails, setCustomDetails] = useState("");
  const [tone, setTone] = useState("professional");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const options =
    sourceType === "project"
      ? profile.projects.map((p) => ({ id: p.id, title: p.title, details: p.description }))
      : sourceType === "experience"
        ? profile.experience.map((e) => ({ id: e.id, title: `${e.role} @ ${e.organization}`, details: e.description }))
        : sourceType === "coursework"
          ? profile.coursework.map((c) => ({ id: c.id, title: c.title, details: c.description }))
          : [];

  async function generate() {
    setError(null);
    let title = customTitle;
    let details = customDetails;
    if (sourceType !== "custom") {
      const selected = options.find((o) => o.id === sourceId);
      if (!selected) {
        setError("Pick an entry first, or switch to Custom.");
        return;
      }
      title = selected.title;
      details = selected.details;
    }
    if (!title || !details) {
      setError("Title and details can't be empty.");
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceType, sourceTitle: title, details, tone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to generate post.");
        return;
      }
      setPosts([data, ...posts]);
    } finally {
      setGenerating(false);
    }
  }

  async function copyToClipboard(id: string, content: string) {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  async function deletePost(id: string) {
    await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPosts(posts.filter((p) => p.id !== id));
  }

  return (
    <section className={cardClass}>
      <h2 className={sectionTitleClass}>Generate a LinkedIn post</h2>
      <p className="text-sm text-slate-500">
        Pick a win from your profile (or write a custom one) and get a draft post you can copy and paste.
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Source</label>
          <select
            className={inputClass}
            value={sourceType}
            onChange={(e) => {
              setSourceType(e.target.value as PostSourceType);
              setSourceId("");
            }}
          >
            <option value="project">Project</option>
            <option value="experience">Experience / internship</option>
            <option value="coursework">Coursework</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        {sourceType !== "custom" && (
          <div className="col-span-2">
            <label className={labelClass}>Which one?</label>
            <select
              className={inputClass}
              aria-label="Which one?"
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
            >
              <option value="">Select…</option>
              {options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.title || "(untitled)"}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {sourceType === "custom" && (
        <div className="space-y-2">
          <input
            className={inputClass}
            placeholder="Title (e.g. 'Won 1st place at HackTX')"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
          />
          <textarea
            className={inputClass}
            rows={3}
            placeholder="Details to build the post from"
            value={customDetails}
            onChange={(e) => setCustomDetails(e.target.value)}
          />
        </div>
      )}

      <div>
        <label className={labelClass}>Tone</label>
        <select className={inputClass} value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="professional">Professional</option>
          <option value="enthusiastic">Enthusiastic</option>
          <option value="reflective">Reflective</option>
        </select>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button className={buttonClass} onClick={generate} disabled={generating}>
        {generating ? "Generating…" : "Generate post"}
      </button>

      {posts.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Drafts</h3>
          {posts.map((post) => (
            <div key={post.id} className="rounded-md border border-slate-100 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {post.sourceTitle} · {post.tone} · {new Date(post.createdAt).toLocaleString()}
                </span>
                <div className="flex gap-3">
                  <button className={secondaryButtonClass} onClick={() => copyToClipboard(post.id, post.content)}>
                    {copiedId === post.id ? "Copied!" : "Copy"}
                  </button>
                  <button className={dangerButtonClass} onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-sm text-slate-800">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
