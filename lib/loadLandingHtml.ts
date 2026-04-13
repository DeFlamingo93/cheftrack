import { readFileSync } from "node:fs";
import { join } from "node:path";

export function loadLandingHtml() {
  return readFileSync(join(process.cwd(), "content", "landing-page.html"), "utf8");
}
