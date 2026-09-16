import { promises as fs } from "fs";
import path from "path";
import type { AppData } from "./types";
import { emptyProfile, defaultTheme } from "./types";
import { readBlobRaw, writeBlobRaw } from "./blobStore";

const DATA_FILE = path.join(process.cwd(), "data", "app-data.json");

// Vercel's serverless functions run on a read-only filesystem (only /tmp is
// writable, and it isn't shared or persistent across invocations), so plain
// file writes silently can't work there. When a Blob store is attached to
// the Vercel project it injects BLOB_READ_WRITE_TOKEN automatically — use
// that as the signal to switch backends. Locally, this stays unset and the
// app keeps using the on-disk JSON file.
const useBlobStorage = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const defaultData: AppData = {
  profile: emptyProfile,
  posts: [],
};

function parseAppData(raw: string): AppData {
  const parsed = JSON.parse(raw) as Partial<AppData>;
  return {
    profile: {
      ...emptyProfile,
      ...parsed.profile,
      theme: { ...defaultTheme, ...parsed.profile?.theme },
    },
    posts: parsed.posts ?? [],
  };
}

export async function readData(): Promise<AppData> {
  if (useBlobStorage) {
    const raw = await readBlobRaw();
    return raw ? parseAppData(raw) : defaultData;
  }

  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return parseAppData(raw);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return defaultData;
    }
    throw err;
  }
}

export async function writeData(data: AppData): Promise<void> {
  const raw = JSON.stringify(data, null, 2);

  if (useBlobStorage) {
    await writeBlobRaw(raw);
    return;
  }

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, raw, "utf-8");
}
