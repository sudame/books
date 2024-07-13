/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from "vitest";
import { getBook } from "./getBook";

describe("getBook", async () => {
  test("都市計画総論", async () => {
    const book = await getBook("9784306073081");

    expect(book).toMatchObject({
      isbn: "9784306073081",
      title: "都市計画総論",
      authors: ["磯部友彦", "松山明", "服部敦"],
      price: 2800,
      dateOfIssue: "2014年9月",
    });
  });

  test("JavaScript: The Good Parts", async () => {
    const book = await getBook("9784873113913");

    expect(book).toMatchObject({
      isbn: "9784873113913",
      title:
        "JavaScript:the good parts : 「良いパーツ」によるベストプラクティス",
      authors: ["Douglas Crockford", "水野貴明"],
      price: 1800,
      dateOfIssue: "2008年12月",
    });
  });
});
