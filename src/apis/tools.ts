const startsWithNumberTester = /^\d/;
const japaneseWordTester = /^[\p{scx=Hiragana}\p{scx=Katakana}\p{scx=Han}]+$/u;

export function commaSeparatedNameToName(commaSeparatedName: string) {
  const nameParts = commaSeparatedName
    .split(",")
    .map((part) => part.trim())
    .filter((part) => !startsWithNumberTester.test(part));

  if (japaneseWordTester.test(nameParts[0])) {
    return nameParts.join("");
  }

  return nameParts.toReversed().join(" ");
}
