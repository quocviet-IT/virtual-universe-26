import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const query = process.argv.slice(2).join(" ").trim();

if (!query) {
  console.error("Usage: npm run search -- <word>");
  process.exitCode = 1;
} else {
  const highlightsPath = new URL("./notes/keynote-highlights.json", import.meta.url);
  const { highlights } = JSON.parse(readFileSync(fileURLToPath(highlightsPath), "utf8"));
  const normalizedQuery = query.toLowerCase();
  const matches = highlights.filter(({ title, summary }) =>
    `${title} ${summary}`.toLowerCase().includes(normalizedQuery),
  );
  const matchesByTopic = new Map();

  for (const highlight of matches) {
    const topicHighlights = matchesByTopic.get(highlight.topic) ?? [];
    topicHighlights.push(highlight);
    matchesByTopic.set(highlight.topic, topicHighlights);
  }

  if (matches.length === 0) {
    console.log(`No highlights found matching "${query}".`);
  } else {
    for (const [topic, topicHighlights] of matchesByTopic) {
      console.log(
        `${topic}\n${topicHighlights
          .map(({ title, summary }) => `- ${title}: ${summary}`)
          .join("\n")}\n`,
      );
    }
  }
}
