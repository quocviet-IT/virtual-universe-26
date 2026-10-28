import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const highlightsPath = new URL("./notes/keynote-highlights.json", import.meta.url);
const { highlights } = JSON.parse(readFileSync(fileURLToPath(highlightsPath), "utf8"));
const countsByTopic = new Map();

for (const { topic } of highlights) {
  countsByTopic.set(topic, (countsByTopic.get(topic) ?? 0) + 1);
}

for (const [topic, count] of countsByTopic) {
  console.log(`${topic}: ${count}`);
}
