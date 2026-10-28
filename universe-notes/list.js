import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const highlightsPath = new URL("./notes/keynote-highlights.json", import.meta.url);
const { highlights } = JSON.parse(readFileSync(fileURLToPath(highlightsPath), "utf8"));
const highlightsByTopic = new Map();

for (const { topic, title } of highlights) {
  const topicHighlights = highlightsByTopic.get(topic) ?? [];
  topicHighlights.push(title);
  highlightsByTopic.set(topic, topicHighlights);
}

for (const [topic, titles] of highlightsByTopic) {
  console.log(`${topic}\n${titles.map((title) => `- ${title}`).join("\n")}\n`);
}
