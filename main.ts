import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Funniest Excuse for Skipping a Meeting
// One line: my laptop attended the meeting so I did not have to.
// The joke only lands as a single line, so the program validates the
// entry the same way the gate does before writing it out.

const EXCUSE =
  "My laptop joined the Zoom; I didn't. It has been nodding along for twenty minutes and no one has noticed.";

function validateEntry(text: string): void {
  // Count per code point, not UTF-16 code units, so the length the
  // gate sees is the length we check here.
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`Entry must be 1-200 characters, got ${length}.`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only white space.");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Entry must be a single line with no line breaks.");
  }
}

validateEntry(EXCUSE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
console.log(`Wrote ${[...EXCUSE].length} characters to ${join(outDir, "entry.txt")}`);
