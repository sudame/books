import { Book } from "@models";

const domParser = new DOMParser();
const startsWithNumberTester = /^\d/;
const japaneseWordTester = /^[\p{scx=Hiragana}\p{scx=Katakana}\p{scx=Han}]+$/u;

export function convertIsbn10ToIsbn13(isbn10: string): string {
  const isbn10Array = isbn10.split("").map(Number);
  const isbn13Array = [9, 7, 8].concat(isbn10Array);
  const sum = isbn13Array
    .map((digit, index) => digit * (index % 2 === 0 ? 1 : 3))
    .reduce((acc, current) => acc + current, 0);
  const checkDigit = (10 - (sum % 10)) % 10;
  return isbn13Array.concat(checkDigit).join("");
}

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

function extractAuthors(bookElement: Element) {
  const creatorElements = bookElement.getElementsByTagName("dc:creator");

  if (creatorElements == null) return null;

  const creatorElementList = Array.from(creatorElements);
  const creators = creatorElementList
    .map((element) => element.textContent)
    .filter((creator) => creator != null)
    .map(commaSeparatedNameToName);
  return creators;
}

function extractPrice(bookElement: Element) {
  const stringPrice = bookElement
    .getElementsByTagName("dcndl:price")?.[0]
    ?.textContent?.replace("円", "");
  if (stringPrice == null) {
    return null;
  }

  return Number(stringPrice);
}

function extractDateOfIssue(bookElement: Element) {
  const date =
    bookElement.getElementsByTagName("dcterms:issued")?.[0]?.textContent;
  if (date == null) {
    return null;
  }

  const [year, month, day] = date.split(".");

  if (day != null) return `${year}年${month}月${day}日`;
  if (month != null) return `${year}年${month}月`;
  return `${year}年`;
}

function extractIsbn(bookElement: Element): string | null {
  const isbnWithHyphen = Array.from(
    bookElement.getElementsByTagName(`dc:identifier`)
  ).filter((element) => element.getAttribute("xsi:type") === "dcndl:ISBN")?.[0]
    ?.textContent;

  if (isbnWithHyphen == null) return null;

  const isbn = isbnWithHyphen.replaceAll("-", "");

  if (isbn.length === 10) return convertIsbn10ToIsbn13(isbn.slice(0, 9));
  return isbn;
}

function extractTitle(bookElement: Element): string | null {
  return bookElement.getElementsByTagName("dc:title")?.[0]?.textContent ?? null;
}

function extractIsPaperBook(bookElement: Element): boolean {
  const categories = Array.from(bookElement.getElementsByTagName("category"))
    .map((el) => el.textContent)
    .filter((el) => el != null);

  return categories.includes("紙");
}

function xmlDocToBook(bookElement: Element): Book {
  const isbn = extractIsbn(bookElement)!;
  const title = extractTitle(bookElement)!;
  const authors = extractAuthors(bookElement);
  const price = extractPrice(bookElement);
  const dateOfIssue = extractDateOfIssue(bookElement);

  return {
    isbn,
    title,
    authors,
    price,
    dateOfIssue,
  };
}

function parseXmlDoc(doc: Document): Book[] {
  const bookElements = Array.from(doc.getElementsByTagName("item"));
  return bookElements
    .filter(extractIsPaperBook)
    .filter((el) => extractTitle(el) != null)
    .filter((el) => extractIsbn(el) != null)
    .map((bookElement) => xmlDocToBook(bookElement));
}

export function searchBooks(query: string): Promise<Book[]> {
  return fetch(
    `https://ndlsearch.ndl.go.jp/api/opensearch?any=${query}&mediatype=books`
  )
    .then((response) => response.text())
    .then((xmlText) => domParser.parseFromString(xmlText, "text/xml"))
    .then(parseXmlDoc);
}
