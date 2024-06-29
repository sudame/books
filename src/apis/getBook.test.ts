/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from "vitest";
import { commaSeparatedNameToName, getBook } from "./getBook";

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

describe("commaSeparatedNameToName", () => {
  test("日本人の名前", () => {
    const name = "須田, 幹大";
    const result = commaSeparatedNameToName(name);
    expect(result).toBe("須田幹大");
  });

  test("日本人の名前; 生年付き", () => {
    const name = "須田, 幹大, 1997-";
    const result = commaSeparatedNameToName(name);
    expect(result).toBe("須田幹大");
  });

  test("外国人の名前", () => {
    const name = "Obama, Barack";
    const result = commaSeparatedNameToName(name);
    expect(result).toBe("Barack Obama");
  });
});
