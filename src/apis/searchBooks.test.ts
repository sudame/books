import { expect, test } from "vitest";
import { searchBooks } from "./searchBooks";

test("searchBooks", async () => {
  const books = await searchBooks("javascript");

  const titles = books.map((book) => book.title);

  expect(titles).toBeInstanceOf(Array);
  expect(titles[0]).toBeTypeOf("string");
});
