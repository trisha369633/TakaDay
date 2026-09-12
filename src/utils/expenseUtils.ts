const expenseEmojiRules: Array<[string[], string]> = [
  [["lunch"], "🍔"],
  [["dinner"], "🍽️"],
  [["breakfast"], "🥐"],
  [["pen"], "🖊️"],
  [["photocopy", "copy"], "📄"],
  [["book", "study"], "📚"],
  [["transport", "bus"], "🚌"],
  [["rickshaw"], "🛺"],
  [["coffee"], "☕"],
  [["clothes", "shirt"], "👕"],
  [["movie"], "🎬"],
  [["medicine"], "💊"],
  [["phone"], "📱"],
  [["gift"], "🎁"],
];

export function getExpenseEmoji(description: string): string {
  const normalizedDescription = description.toLowerCase();
  const matchingRule = expenseEmojiRules.find(([keywords]) =>
    keywords.some((keyword) => normalizedDescription.includes(keyword)),
  );

  return matchingRule?.[1] ?? "💸";
}
