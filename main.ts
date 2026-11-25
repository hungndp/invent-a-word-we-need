// Invent a Word We Need — make.fun entry.
//
// One new English word plus its definition in one clear line, at most 140
// characters total. The word fills a real gap: reopening an app seconds
// after closing it, hoping something new appeared. It is sayable, spellable
// and memorable — "repeep" — and the definition lands in one reading:
// the refresh button for people who already refreshed.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// SETUP: the word and the gap it fills — reopening an app just closed.
const SETUP =
  "Repeep (verb): reopening an app seconds after closing it, hoping for something new — ";

// PUNCH: the definition's sting — the refresh button for the already-refreshed.
const PUNCH =
  "the refresh button for the already-refreshed.";

// The entry is the two parts joined: one line, word plus definition.
const TEXT = SETUP + PUNCH;

function clearDir(dir: string): void {
  // Clear only the directory's contents, never the directory itself:
  // the grader runs on a read-only filesystem whose parent is not writable.
  for (const f of readdirSync(dir)) {
    rmSync(join(dir, f), { force: true, recursive: true });
  }
}

function main(): void {
  // Gate: 1 to 140 characters, never only whitespace.
  if (TEXT.length < 1 || TEXT.length > 140) {
    throw new Error(`entry is ${TEXT.length} chars, gate is 1-140`);
  }
  if (!TEXT.trim()) throw new Error("entry is only whitespace");
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  clearDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
