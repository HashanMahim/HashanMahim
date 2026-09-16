import { put, head, BlobNotFoundError } from "@vercel/blob";

const BLOB_PATHNAME = "app-data.json";

/** Reads the raw JSON string from Vercel Blob, or null if nothing has been saved yet. */
export async function readBlobRaw(): Promise<string | null> {
  try {
    const blob = await head(BLOB_PATHNAME);
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.text();
  } catch (err) {
    if (err instanceof BlobNotFoundError) return null;
    throw err;
  }
}

export async function writeBlobRaw(raw: string): Promise<void> {
  await put(BLOB_PATHNAME, raw, {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json",
    // 1 minute is the platform minimum for edge/browser cache — keeps the
    // window between a save and the public page reflecting it as short as
    // Vercel Blob allows.
    cacheControlMaxAge: 60,
  });
}
