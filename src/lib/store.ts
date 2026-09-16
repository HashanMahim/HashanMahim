import { promises as fs } from "fs";
import path from "path";
import type { AppData } from "./types";
import { emptyProfile } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "app-data.json");

const defaultData: AppData = {
  profile: emptyProfile,
  posts: [],
};

export async function readData(): Promise<AppData> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return {
      profile: { ...emptyProfile, ...parsed.profile },
      posts: parsed.posts ?? [],
    };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return defaultData;
    }
    throw err;
  }
}

export async function writeData(data: AppData): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
