export interface LinkEntry {
  id: string;
  label: string;
  url: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  link?: string;
  tags: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CourseworkEntry {
  id: string;
  title: string;
  institution: string;
  description: string;
}

export interface Profile {
  name: string;
  headline: string;
  bio: string;
  email: string;
  location: string;
  links: LinkEntry[];
  skills: string[];
  projects: ProjectEntry[];
  experience: ExperienceEntry[];
  coursework: CourseworkEntry[];
}

export type PostSourceType = "project" | "experience" | "coursework" | "custom";

export interface GeneratedPost {
  id: string;
  sourceType: PostSourceType;
  sourceTitle: string;
  tone: string;
  content: string;
  createdAt: string;
}

export interface AppData {
  profile: Profile;
  posts: GeneratedPost[];
}

export const emptyProfile: Profile = {
  name: "",
  headline: "",
  bio: "",
  email: "",
  location: "",
  links: [],
  skills: [],
  projects: [],
  experience: [],
  coursework: [],
};
