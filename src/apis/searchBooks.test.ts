/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest";
import { searchBooks } from "./searchBooks";

test("searchBooks", async () => {
  const books = await searchBooks("javascript");

  const titles = books.map((book) => book.title);
  const isbns = books.map((book) => book.isbn);

  console.log(books);

  expect(titles).toBeInstanceOf(Array);
  expect(titles[0]).toBeTypeOf("string");

  expect(isbns).toBeInstanceOf(Array);
  expect(isbns.some((isbn) => isbn === null)).toBe(false);
});
