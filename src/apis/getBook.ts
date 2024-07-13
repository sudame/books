import type { Book } from "../models/Book";

const domParser = new DOMParser();
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

function extractAuthors(doc: Document) {
  const creatorElements = Array.from(
    doc.getElementsByTagName("dc:creator") ?? [],
  );
  const creators = creatorElements
    .map((element) => element.textContent)
    .filter((creator) => creator != null)
    .map(commaSeparatedNameToName);
  return creators;
}

function extractPrice(doc: Document) {
  const stringPrice = doc
    .getElementsByTagName("dcndl:price")?.[0]
    ?.textContent?.replace("円", "");
  if (stringPrice == null) {
    return null;
  }

  return Number(stringPrice);
}

function extractDateOfIssue(doc: Document) {
  const date = doc.getElementsByTagName("dcterms:issued")?.[0]?.textContent;
  if (date == null) {
    return null;
  }

  const [year, month, day] = date.split(".");

  if (day != null) return `${year}年${month}月${day}日`;
  if (month != null) return `${year}年${month}月`;
  return `${year}年`;
}

function xmlDocToBook(isbn: string, doc: Document): Book | null {
  const resultCountString =
    doc.getElementsByTagName("openSearch:totalResults")?.[0]?.textContent ?? 0;
  const resultCount = Number(resultCountString);
  if (resultCount === 0) return null;

  const title =
    doc.getElementsByTagName("dc:title")?.[0]?.textContent ?? "不明な書名";
  const authors = extractAuthors(doc);
  const price = extractPrice(doc);
  const dateOfIssue = extractDateOfIssue(doc) ?? "不明な発行日";

  return {
    isbn,
    title,
    authors,
    price,
    dateOfIssue,
  };
}

export async function getBook(isbn: string) {
  return fetch(`https://ndlsearch.ndl.go.jp/api/opensearch?isbn=${isbn}`)
    .then((response) => response.text())
    .then((xml) => domParser.parseFromString(xml, "text/xml"))
    .then((doc) => xmlDocToBook(isbn, doc));
}
