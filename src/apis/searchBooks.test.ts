import type { Book } from "@models";
import { describe, expect, test } from "vitest";
import { sortBooks } from "./searchBooks";

describe("sortBooks", () => {
  test("似ているタイトルの本が上位に表示される", () => {
    const query = "JavaScript";
    const books = [
      // 検索語以外の文字が大量に含まれる本
      {
        title: "素晴らしく素敵な言語JavaScriptを完全に理解しよう",
      },

      // 検索語に完全に一致する本
      {
        title: "JavaScript",
      },

      // 検索語と完全には一致しないが、非常に近い本
      {
        title: "JavaScriptの本",
      },

      // 検索語が全く含まれない本
      {
        title: "なんでもかんでもPythonを使えば良いってもんじゃないぞ",
      },
    ] as Book[];

    const actual = sortBooks(query, books).map((book) => book.title);
    const expected = [
      "JavaScript",
      "JavaScriptの本",
      "素晴らしく素敵な言語JavaScriptを完全に理解しよう",
      "なんでもかんでもPythonを使えば良いってもんじゃないぞ",
    ];

    expect(actual).toEqual(expected);
  });

  test("同じタイトルの本は発売日が最近である本が上位に表示される", () => {
    const query = "JavaScript";
    const books = [
      {
        isbn: "0",
        title: "JavaScript",
        dateOfIssue: "2024年3月2日",
      },
      {
        isbn: "1",
        title: "JavaScript",
        dateOfIssue: "2024年3月3日",
      },
      {
        isbn: "2",
        title: "JavaScript",
        dateOfIssue: "1997年9月23日",
      },
      {
        isbn: "3",
        title: "JavaScript",
        dateOfIssue: "2024年10月12日",
      },
    ] as Book[];

    const actual = sortBooks(query, books).map((book) => book.isbn);
    const expected = ["3", "1", "0", "2"];

    expect(actual).toEqual(expected);
  });
});
