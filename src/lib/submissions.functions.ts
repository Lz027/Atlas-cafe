import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submissionSchema = z.object({
  kind: z.enum(["recipe", "journal"]),
  title: z.string().trim().min(2).max(120),
  authorName: z.string().trim().min(1).max(80),
  method: z.string().trim().min(1).max(40),
  dose: z.coerce.number().positive().max(500).optional(),
  water: z.coerce.number().positive().max(5000).optional(),
  tempC: z.coerce.number().min(0).max(100).optional(),
  timeLabel: z.string().trim().max(20).optional(),
  flavors: z.array(z.string().trim().max(30)).max(8).default([]),
  notes: z.string().trim().max(1000).optional(),
  imageUrl: z
    .string()
    .trim()
    .url("Image link must be a full URL starting with https://")
    .max(500)
    .refine((u) => u.startsWith("https://"), "Image link must start with https://")
    .optional(),
  imageAlt: z.string().trim().max(140).optional(),
});

export type Submission = z.infer<typeof submissionSchema> & {
  id: string;
  status: "pending" | "approved";
  createdAt: string;
};

async function readStore(file: string): Promise<Submission[]> {
  const fs = await import("fs/promises");
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Submission[];
  } catch {
    return [];
  }
}

async function writeStore(file: string, rows: Submission[]): Promise<void> {
  const fs = await import("fs/promises");
  const path = await import("path");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(rows, null, 2));
}

const STORE_PATH = "data/submissions.json";

export const listApprovedSubmissions = createServerFn({ method: "GET" }).handler(
  async (): Promise<Submission[]> => {
    const path = await import("path");
    const file = path.join(process.cwd(), STORE_PATH);
    const rows = await readStore(file);
    return rows
      .filter((r) => r.status === "approved")
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
);

export const submitBrew = createServerFn({ method: "POST" })
  .inputValidator((data) => submissionSchema.parse(data))
  .handler(async ({ data }) => {
    const path = await import("path");
    const file = path.join(process.cwd(), STORE_PATH);
    const rows = await readStore(file);
    const submission: Submission = {
      ...data,
      id: crypto.randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    rows.push(submission);
    await writeStore(file, rows);
    return { ok: true as const, id: submission.id };
  });
