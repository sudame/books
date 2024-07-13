import { describe, expect, test } from "vitest";
import { commaSeparatedNameToName } from "./tools";

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
